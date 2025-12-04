# AI-Driven Development – 30-Day Challenge, Task 9: Claude Code Skills for Book Generation

This document outlines the Claude Code Skills developed for Task 9 of the AI-Driven Development – 30-Day Challenge, focusing on tools to assist in book generation.

## What are Claude Skills?

Claude Skills are modular tools or functions that extend Claude's capabilities. They enable Claude to interact with external systems, perform specific tasks, or access information beyond its core knowledge base. Essentially, they are custom actions that can be taught to Claude to perform various functions.

## How skills work inside the `.claudecode` folder

The `.claudecode` folder serves as the repository for these custom skills. Each skill is typically defined by two primary files within its own subdirectory:
-   `skill.json`: This file acts as the manifest for the skill, defining its name, a brief description, the input `parameters` it expects, and the structure of the `output` it will return. This JSON schema allows Claude to understand how to invoke the skill and what data to provide/expect.
-   `script.js`: This JavaScript file contains the actual logic for the skill. When Claude "uses" a skill, it executes the `main` function within this script, passing the parameters defined in `skill.json`. This script can perform operations, make API calls, or contain any computational logic required by the skill.

## Project Folder Structure

The complete folder structure for this Task 9 project is as follows:

```
.claudecode
 └── skills
      ├── chapter-outline
      │     ├── skill.json
      │     └── script.js
      ├── character-development
      │     ├── skill.json
      │     └── script.js
      └── plot-checker
            ├── skill.json
            └── script.js
```

## Skill Definitions and File Contents

Below are the detailed definitions and file contents for each of the three developed skills:

---

### 1. Chapter Outline Generator

This skill is designed to generate a structured chapter outline for a book based on a given topic and the desired number of chapters.

**`skill.json` content:**
```json
{
  "name": "Chapter Outline Generator",
  "description": "Generates a detailed chapter outline for a book based on a given topic or premise and the desired number of chapters.",
  "parameters": {
    "type": "object",
    "properties": {
      "topic": {
        "type": "string",
        "description": "The main topic or premise of the book for which to generate an outline."
      },
      "numChapters": {
        "type": "number",
        "description": "The desired number of chapters in the outline. Defaults to 10 if not specified.",
        "default": 10
      }
    },
    "required": ["topic"]
  },
  "output": {
    "type": "object",
    "properties": {
      "outline": {
        "type": "array",
        "description": "An array of chapter objects, each containing the chapter number, title, and a brief summary.",
        "items": {
          "type": "object",
          "properties": {
            "chapterNumber": {"type": "number"},
            "title": {"type": "string"},
            "summary": {"type": "string"}
          },
          "required": ["chapterNumber", "title", "summary"]
        }
      }
    }
  }
}
```

**`script.js` content:**
```javascript
// script.js for Chapter Outline Generator skill
// This script simulates generating a chapter outline based on a topic and number of chapters.

async function generateChapterOutline(topic, numChapters = 10) {
  console.log(`Generating a ${numChapters}-chapter outline for the book topic: "${topic}"`);

  const outline = [];
  const coreConcepts = [
    `Introduction to ${topic}`,
    `Historical Context of ${topic}`,
    `Key Theories and Principles of ${topic}`,
    `Methodologies and Approaches in ${topic}`,
    `Case Studies or Applications of ${topic}`,
    `Challenges and Controversies in ${topic}`,
    `Future Trends and Outlook for ${topic}`,
    `Impact and Significance of ${topic}`,
    `Advanced Concepts in ${topic}`,
    `Conclusion and Summary of ${topic}`
  ];

  for (let i = 0; i < numChapters; i++) {
    const chapterNumber = i + 1;
    let title;
    let summary;

    if (i < coreConcepts.length) {
      title = `Chapter ${chapterNumber}: ${coreConcepts[i]}`;
      summary = `This chapter will delve into the ${coreConcepts[i].toLowerCase()}, exploring its fundamental aspects and initial understanding within the context of the book's overall theme.`;
    } else {
      // For topics with more chapters than predefined core concepts, generate generic ones
      title = `Chapter ${chapterNumber}: Further Exploration of ${topic} (Part ${chapterNumber - coreConcepts.length + 1})`;
      summary = `This chapter expands on the intricate details of ${topic}, providing additional insights and examples not covered in earlier sections.`;
    }

    outline.push({
      chapterNumber: chapterNumber,
      title: title,
      summary: summary
    });
  }

  // In a real scenario, this would likely involve an LLM call to generate more creative and specific content.
  // Example: const llmGeneratedOutline = await callLLM('generate_outline', { topic, numChapters });
  // return { outline: llmGeneratedOutline };

  return { outline: outline };
}

// This function will be called by Claude to execute the skill
exports.main = generateChapterOutline;
```

---

### 2. Character Development Assistant

This skill helps in creating detailed character profiles, encompassing their name, role, personality, backstory, and motivations.

**`skill.json` content:**
```json
{
  "name": "Character Development Assistant",
  "description": "Generates a detailed character profile, including name, role, personality, backstory, and motivations, based on initial traits and story genre.",
  "parameters": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "description": "The name of the character."
      },
      "role": {
        "type": "string",
        "description": "The character's role in the story (e.g., protagonist, antagonist, sidekick, mentor, villain)."
      },
      "traits": {
        "type": "array",
        "items": {"type": "string"},
        "description": "Key personality traits and characteristics of the character (e.g., 'brave', 'cynical', 'ambitious', 'loyal', 'secretive')."
      },
      "genre": {
        "type": "string",
        "description": "The genre of the story, to help tailor the character's profile (e.g., 'fantasy', 'sci-fi', 'mystery', 'romance', 'thriller').",
        "default": "general fiction"
      }
    },
    "required": ["name", "role", "traits"]
  },
  "output": {
    "type": "object",
    "properties": {
      "characterProfile": {
        "type": "object",
        "properties": {
          "name": {"type": "string"},
          "role": {"type": "string"},
          "personality": {"type": "string", "description": "A detailed description of the character's personality."},
          "backstory": {"type": "string", "description": "A brief history and background of the character."},
          "motivations": {"type": "string", "description": "What drives the character's actions and goals."}
        },
        "required": ["name", "role", "personality", "backstory", "motivations"]
      }
    }
  }
}
```

**`script.js` content:**
```javascript
// script.js for Character Development Assistant skill
// This script simulates generating a detailed character profile.

async function developCharacter(name, role, traits, genre = "general fiction") {
  console.log(`Developing character profile for ${name} (Role: ${role}, Traits: ${traits.join(', ')}, Genre: ${genre})`);

  let personality = `A character known for being ${traits.join(', ')}. Their core nature is shaped by their experiences, making them ${traits[0]} in times of crisis and ${traits[1] || traits[0]} in their daily interactions.`;
  let backstory = `${name} grew up in [a setting appropriate for ${genre}], facing challenges related to [one of their traits]. A pivotal event in their past involved [a key experience that forged their current personality or goal].`;
  let motivations = `${name}'s primary motivation stems from [a deep-seated desire or a past trauma related to their role]. They are driven to [achieve a goal relevant to their role and traits], often clashing with [an opposing force or internal conflict].`;

  // Example of how traits might influence generated content
  if (traits.includes("brave")) {
    backstory += " They once stood up against a formidable foe, earning respect but also making enemies.";
  }
  if (traits.includes("cynical")) {
    motivations += " Their cynicism often masks a hidden idealism, or it could be a protective mechanism against disappointment.";
  }
  if (role.toLowerCase() === "antagonist") {
    personality = `A cunning and ${traits.join(', ')} individual, ${name}'s darker nature is a direct response to [a perceived injustice or ambition].`;
    motivations = `Driven by a desire for [power/revenge/control] stemming from [their backstory], ${name} believes their actions, however extreme, are justified.`;
  }
    if (role.toLowerCase() === "mentor") {
    personality = `A wise and ${traits.join(', ')} figure, ${name} has seen much and learned many lessons.`;
    motivations = `Motivated by a desire to guide and protect, ${name} seeks to impart knowledge and prevent others from making similar mistakes they may have made.`;
  }

  // In a real scenario, this would likely involve an LLM call to generate more creative and specific content.
  // Example: const llmGeneratedProfile = await callLLM('generate_character_profile', { name, role, traits, genre });
  // return { characterProfile: llmGeneratedProfile };


  return {
    characterProfile: {
      name: name,
      role: role,
      personality: personality,
      backstory: backstory,
      motivations: motivations
    }
  };
}

// This function will be called by Claude to execute the skill
exports.main = developCharacter;
```

---

### 3. Plot Consistency Checker

This skill analyzes a book's plot summary to identify inconsistencies across major story elements such as the introduction, central conflict, climax, and ending.

**`skill.json` content:**
```json
{
  "name": "Plot Consistency Checker",
  "description": "Analyzes a book's plot summary, specifically checking for logical consistency across major story elements like the introduction, central conflict, climax, and ending.",
  "parameters": {
    "type": "object",
    "properties": {
      "plotSummary": {
        "type": "string",
        "description": "A comprehensive summary of the book's plot, ideally covering introduction, conflict, climax, and ending."
      }
    },
    "required": ["plotSummary"]
  },
  "output": {
    "type": "object",
    "properties": {
      "analysis": {
        "type": "string",
        "description": "A detailed analysis of the plot summary's consistency."
      },
      "suggestions": {
        "type": "array",
        "items": {"type": "string"},
        "description": "Suggestions for improving plot consistency or addressing identified issues."
      },
      "issuesFound": {
        "type": "boolean",
        "description": "True if any significant consistency issues were found, false otherwise."
      }
    }
  }
}
```

**`script.js` content:**
```javascript
// script.js for Plot Consistency Checker skill
// This script simulates checking plot consistency across major story elements.

async function checkPlotConsistency(plotSummary) {
  console.log("Analyzing plot summary for consistency...");

  let analysis = "Initial assessment: The plot elements seem generally consistent, but further detail would strengthen coherence.";
  let suggestions = [];
  let issuesFound = false;

  const lowerCaseSummary = plotSummary.toLowerCase();

  // Simulate identifying major elements (very rudimentary, would be LLM-driven in reality)
  const hasIntroKeywords = /^(in the beginning|the story opens with|our tale begins|introducing)/.test(lowerCaseSummary);
  const hasConflictKeywords = /(conflict arises|a problem emerges|challenge presents itself|struggle against)/.test(lowerCaseSummary);
  const hasClimaxKeywords = /(climax of the story|turning point|final confrontation|peak of tension)/.test(lowerCaseSummary);
  const hasEndingKeywords = /(in the end|finally|the resolution|the conclusion)/.test(lowerCaseSummary);

  if (!hasIntroKeywords) {
    analysis += " It's unclear how the story begins or what sets the initial scene.";
    suggestions.push("Ensure the introduction clearly establishes the setting, main characters, and initial situation.");
    issuesFound = true;
  }
  if (!hasConflictKeywords) {
    analysis += " The core conflict or central problem is not clearly defined.";
    suggestions.push("Articulate the main conflict that drives the narrative forward.");
    issuesFound = true;
  }
  if (!hasClimaxKeywords && hasConflictKeywords) { // Only suggest if conflict was found
    analysis += " The plot seems to lack a clear climax or peak of action/tension.";
    suggestions.push("Develop a clear climax where the main conflict comes to a head and the protagonist faces their greatest challenge.");
    issuesFound = true;
  }
  if (!hasEndingKeywords) {
    analysis += " The resolution or ending of the story is vague or missing.";
    suggestions.push("Provide a clear and satisfying resolution that addresses the main conflict and character arcs.");
    issuesFound = true;
  }

  // Rudimentary consistency checks
  if (hasIntroKeywords && hasEndingKeywords && !plotSummary.includes("transforms") && !plotSummary.includes("changes") && !plotSummary.includes("learns")) {
      analysis += " The ending doesn't seem to indicate significant character or plot development from the introduction.";
      suggestions.push("Ensure the ending demonstrates how the introduction's setup has been challenged or transformed by the conflict and climax.");
      issuesFound = true;
  }

  if (hasConflictKeywords && hasEndingKeywords) {
    // Check if the ending implicitly resolves the conflict
    if (!lowerCaseSummary.includes("resolves") && !lowerCaseSummary.includes("overcomes") && !lowerCaseSummary.includes("defeats")) {
      analysis += " While a conflict is present, the summary doesn't explicitly state how it's resolved by the ending.";
      suggestions.push("Clearly show how the ending directly addresses and resolves the central conflict introduced earlier.");
      issuesFound = true;
    }
  }


  if (!issuesFound) {
    analysis = "The plot summary demonstrates good consistency across its major elements. The introduction sets the stage, the conflict is clear, and the climax leads to a logical conclusion.";
  } else if (suggestions.length === 0) {
      // Fallback if issuesFound is true but no specific suggestions were added by the rudimentary checks
      suggestions.push("Review the overall narrative flow to ensure a seamless progression from start to finish, paying attention to cause and effect between major plot points.");
  }


  // In a real scenario, this would likely involve an LLM call for in-depth analysis.
  // Example: const llmAnalysis = await callLLM('analyze_plot_consistency', { plotSummary });
  // return { analysis: llmAnalysis.analysis, suggestions: llmAnalysis.suggestions, issuesFound: llmAnalysis.issuesFound };

  return {
    analysis: analysis,
    suggestions: suggestions,
    issuesFound: issuesFound
  };
}

// This function will be called by Claude to execute the skill
exports.main = checkPlotConsistency;
```
