package com.jobmatch.admin.models;

public class CodingChallenge {
    private String name;
    private String difficulty;
    private String successRate;

    public CodingChallenge(String name, String difficulty, String successRate) {
        this.name = name;
        this.difficulty = difficulty;
        this.successRate = successRate;
    }

    public String getName() { return name; }
    public String getDifficulty() { return difficulty; }
    public String getSuccessRate() { return successRate; }
}
