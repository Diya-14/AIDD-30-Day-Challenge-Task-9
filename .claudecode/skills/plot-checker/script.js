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