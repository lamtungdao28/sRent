package com.srent.contract; import java.util.List;
public interface ContractAnalysisProvider {Result analyze(String text);String name();boolean simulated();record Risk(String category,String severity,String explanation,String excerpt,String suggestedQuestion){}record Result(List<Risk> risks){} }
