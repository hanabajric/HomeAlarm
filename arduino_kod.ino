#include <SoftwareSerial.h>

const byte rxPin =11;
const byte txPin =12;
int pirPin = 13; 
int pirStat = 0;                   // PIR status

SoftwareSerial ESP8266 (rxPin, txPin);

//unsigned long lastTimeMillis = 0;

void setup() {
  pinMode(pirPin, INPUT);     
  Serial.begin(115200);   
  ESP8266.begin(115200);
  delay(2000);
}

void printResponse() {
  while (ESP8266.available()) {
    Serial.println(ESP8266.readStringUntil('\n')); 
  }
}

void loop() {

    delay(1000);
    pirStat = digitalRead(pirPin); 

  if (pirStat == HIGH) {
    Serial.println("Hey I got you!!!");
    //lastTimeMillis = millis();

    ESP8266.println("AT+CIPMUX=1");
    delay(500);
    printResponse();

    ESP8266.println("AT+CIPSTART=4,\"TCP\",\"192.168.1.15\",5001");
    delay(500);
    printResponse();

    String cmd = "GET /Alarm/UpaliAlarm HTTP/1.1\r\nHost:192.168.1.15:5001";
    ESP8266.println("AT+CIPSEND=4," + String(cmd.length() + 4));
    delay(500);

    ESP8266.println(cmd);
    delay(500);
    ESP8266.println(""); 

    ESP8266.println("AT+CIPCLOSE=4");
    delay(500);
    printResponse();
  }

  if (ESP8266.available()) {
    Serial.write(ESP8266.read());
  }

}