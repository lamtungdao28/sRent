package com.srent.ekyc; import java.util.List;
public interface EkycProvider { Result process(Input input);String name();boolean simulated();record Input(String legalName,String identityNumber,String address,List<String>documentKeys){}record Result(String extractedData,List<String>anomalies){} }
