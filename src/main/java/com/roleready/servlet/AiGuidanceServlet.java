package com.roleready.servlet;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;

// This servlet is the optional AI endpoint. It only runs when deployed to Tomcat
// with AI_API_KEY set as an environment variable. Without that, the browser falls
// back to the local JavaScript guidance automatically.
@WebServlet("/api/ai-guidance")
public class AiGuidanceServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;
    private static final int MAX_BODY = 20_000;

    private final HttpClient http = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(12))
            .build();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {

        res.setCharacterEncoding(StandardCharsets.UTF_8.name());
        res.setContentType("application/json;charset=UTF-8");
        res.setHeader("Cache-Control", "no-store");

        // if the key isn't set, tell the frontend — it'll use local guidance instead
        String apiKey = trimToNull(System.getenv("AI_API_KEY"));
        if (apiKey == null) {
            res.setStatus(HttpServletResponse.SC_OK);
            res.getWriter().write("{\"ok\":false,\"message\":\"AI_API_KEY not configured. Local guidance is still available.\"}");
            return;
        }

        String body = req.getReader().lines().reduce("", (a, b) -> a + b);
        if (body.length() > MAX_BODY) {
            res.setStatus(HttpServletResponse.SC_REQUEST_ENTITY_TOO_LARGE);
            res.getWriter().write("{\"ok\":false,\"message\":\"Request too large.\"}");
            return;
        }

        try {
            JsonObject input = JsonParser.parseString(body).getAsJsonObject();
            String role    = safe(input, "role",         "the selected role");
            String project = safe(input, "project",      "a portfolio project");
            String hours   = safe(input, "hoursPerWeek", "8");
            JsonArray gaps = input.has("gaps") && input.get("gaps").isJsonArray()
                    ? input.getAsJsonArray("gaps") : new JsonArray();

            String systemPrompt = "You are a practical career-learning helper for college students. "
                    + "Give short, realistic advice based only on the role and gaps provided. "
                    + "Don't promise jobs, salaries or certifications. "
                    + "Suggest a priority order, a simple weekly practice habit, and one way to show progress in a portfolio. "
                    + "Keep the tone supportive and student-friendly. "
                    + "If there are no gaps, suggest validation steps and practice instead.";

            String userPrompt = "Role: " + role
                    + "\nStudy time: " + hours + " hours/week"
                    + "\nSkill gaps: " + gaps
                    + "\nProject idea: " + project;

            JsonObject payload = new JsonObject();
            payload.addProperty("model", envOrDefault("AI_MODEL", "gpt-4o-mini"));
            payload.addProperty("temperature", 0.4);

            JsonArray messages = new JsonArray();
            JsonObject sysMsg = new JsonObject();
            sysMsg.addProperty("role", "system");
            sysMsg.addProperty("content", systemPrompt);
            messages.add(sysMsg);

            JsonObject userMsg = new JsonObject();
            userMsg.addProperty("role", "user");
            userMsg.addProperty("content", userPrompt);
            messages.add(userMsg);

            payload.add("messages", messages);

            String endpoint = envOrDefault("AI_BASE_URL", "https://api.openai.com/v1/chat/completions");
            HttpRequest apiReq = HttpRequest.newBuilder(URI.create(endpoint))
                    .timeout(Duration.ofSeconds(35))
                    .header("Authorization", "Bearer " + apiKey)
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(payload.toString(), StandardCharsets.UTF_8))
                    .build();

            HttpResponse<String> apiRes = http.send(apiReq, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

            if (apiRes.statusCode() < 200 || apiRes.statusCode() >= 300) {
                res.setStatus(HttpServletResponse.SC_BAD_GATEWAY);
                res.getWriter().write("{\"ok\":false,\"message\":\"AI service returned an error.\"}");
                return;
            }

            JsonObject result = JsonParser.parseString(apiRes.body()).getAsJsonObject();
            String guidance = result.getAsJsonArray("choices").get(0).getAsJsonObject()
                    .getAsJsonObject("message").get("content").getAsString();

            JsonObject out = new JsonObject();
            out.addProperty("ok", true);
            out.addProperty("source", "ai-api");
            out.addProperty("guidance", guidance);
            res.getWriter().write(out.toString());

        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            res.setStatus(HttpServletResponse.SC_GATEWAY_TIMEOUT);
            res.getWriter().write("{\"ok\":false,\"message\":\"Request interrupted.\"}");
        } catch (Exception e) {
            res.setStatus(HttpServletResponse.SC_BAD_GATEWAY);
            res.getWriter().write("{\"ok\":false,\"message\":\"Could not get AI guidance. Check server logs.\"}");
        }
    }

    private static String safe(JsonObject obj, String key, String fallback) {
        if (!obj.has(key) || obj.get(key).isJsonNull()) return fallback;
        String val = obj.get(key).getAsString();
        return val.length() > 2000 ? val.substring(0, 2000) : val;
    }

    private static String envOrDefault(String key, String fallback) {
        String val = trimToNull(System.getenv(key));
        return val == null ? fallback : val;
    }

    private static String trimToNull(String s) {
        if (s == null || s.trim().isEmpty()) return null;
        return s.trim();
    }
}
