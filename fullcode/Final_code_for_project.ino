#include <WiFi.h>
#include "DHT.h"
#include <Wire.h>
#include <RTClib.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <ESP32Firebase.h>
#include "HX711.h"



//#define _SSID "SLT-FTTH-481"
//#define _PASSWORD "slt@743481"

//#define _SSID "Sachin"
//#define _PASSWORD "sachin011031"

#define _SSID "GalaxyA12"
#define _PASSWORD "bils1960"

//#define _SSID "Home"
//#define _PASSWORD "Rvsp1234"

#define REFERENCE_URL "https://beewise-6c96a-default-rtdb.firebaseio.com/"




Firebase firebase(REFERENCE_URL);


int relaypin= 13;  //Connect to Pin D4 in ESP32


const int LOADCELL1_DOUT_PIN = 5;
const int LOADCELL1_SCK_PIN = 18;
const int LOADCELL3_DOUT_PIN = 26;
const int LOADCELL3_SCK_PIN = 25;
const int LOADCELL2_DOUT_PIN = 14;
const int LOADCELL2_SCK_PIN = 27;



const int LOADCELL4_DOUT_PIN = 33;
const int LOADCELL4_SCK_PIN = 32;




float total;
float L1;
float L2;
float L3;
float L4;

HX711 scale3;
HX711 scale1;
HX711 scale2;

HX711 scale4;



#define MQ135_PIN 34 
#define DHTPIN 23        // Change this to the pin you used for data
#define DHTTYPE DHT21   // Define the type of sensor

// Constants for calibration
const float RLOAD = 9.3; // Load resistance in kilo ohms
const float RZERO = 79.02; // Base resistance in clean air (to be calibrated)
const float PARA = 116.6020682; // Constants for calculating ppm
const float PARB = 2.119034857; // Constants for calculating ppm



RTC_DS3231 rtc;
DateTime startTime;
bool counting = false;


// Define the start date and time
const int startYear = 2024;   // Replace with the current year if different
const int startMonth = 7;     // July
const int startDay = 15;      // 15th
const int startHour = 0;      // 12 AM
const int startMinute = 0;    // 0 minutes
const int startSecond = 0;    // 0 seconds







DHT dht(DHTPIN, DHTTYPE);       // Initialize the DHT sensor
LiquidCrystal_I2C lcd(0x27, 20, 4);  //display








void setup() 
{
  Serial.begin(9600);

  //////////////////////////////////  //wifi start
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
  delay(5000);

  // Connect to WiFi
  Serial.println();
  Serial.println();
  Serial.print("Connecting to: ");
  Serial.println(_SSID);
  WiFi.begin(_SSID, _PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("wifi is not connected");
  }

  Serial.println("");
  Serial.println("WiFi Connected");

  // Print the IP address
  Serial.print("IP Address: ");
  Serial.print("http://");
  Serial.print(WiFi.localIP());
  Serial.println("/");
  pinMode(13, OUTPUT);
  /////////////////////////////////  //wifi end
  scale3.begin(LOADCELL3_DOUT_PIN, LOADCELL3_SCK_PIN);

  scale3.set_scale(426.75);    // this value is obtained by calibrating the scale with known weights as in previous step
  scale3.tare();	

  scale1.begin(LOADCELL1_DOUT_PIN, LOADCELL1_SCK_PIN);
  scale2.begin(LOADCELL2_DOUT_PIN, LOADCELL2_SCK_PIN);
  scale4.begin(LOADCELL4_DOUT_PIN, LOADCELL4_SCK_PIN);

  scale1.set_scale(422.61); 
  scale2.set_scale(502.81);
  scale4.set_scale(396.47 );

  scale1.tare();
  scale2.tare();
  scale4.tare();

  //pinMode(gassensor, INPUT);  //gas sensor line

  analogReadResolution(12); // Set ADC resolution to 12-bit
  pinMode(MQ135_PIN, INPUT); // Set the pin connected to the sensor as input

  dht.begin();           //  DHT sensor

  // Initialize RTC
  if (!rtc.begin()) {
    Serial.println("Couldn't find RTC");
    while (1);
  }

  if (rtc.lostPower()) {
    // Set the RTC time to the current date and time (for simulation purposes)
    rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));
  }

  // Initialize the startTime with the defined start date and time
  startTime = DateTime(startYear, startMonth, startDay, startHour, startMinute, startSecond);

  // Inform user and start countdown
  Serial.println("Countdown started from July 15, 12:00 AM.");
  counting = true; // Automatically start the countdown

  lcd.init();             // display part start
  lcd.backlight();        // illuminazione attiva

  lcd.setCursor(0, 0);
  lcd.print("Hello World! ");

  lcd.setCursor(0, 1);
  lcd.print("Test LCD I2C");

  lcd.setCursor(0, 2);
  lcd.print("by");

  lcd.setCursor(0, 3);
  lcd.print("Thaaapa");       // pulisco display

  delay(5000);

  lcd.clear();   //display part end
}






void loop() 
{

  L1=scale1.get_units(1);
  L2=scale2.get_units(1);

  L4=scale4.get_units(1);


  L3=scale3.get_units(1);


  if(L3<(-100))
  {
    Serial.print("Load cell 3 Weight: ");
    Serial.println("-25.04");
  }
  else
  {
    Serial.print("Load cell 3 Weight: ");
    Serial.println(L3);

  }




  Serial.print("Load cell 1 Weight: ");
  Serial.println(L1);

  Serial.print("Load cell 2 Weight: ");
  Serial.println(L2);


  Serial.print("Load cell 4 Weight: ");
  Serial.println(L4);

  total=(L1+L2+L4)+L3;

   if(total<(-50))
  {
    Serial.print("Total Weight: ");
    Serial.println(L1+L2+L4);
    Serial.println("");
    Serial.println("");
  }
  else
  {
    Serial.print("Total Weight: ");
    Serial.println(total);
    Serial.println("");
    Serial.println("");

  }


 


  
  scale1.power_down();	
  scale2.power_down();	
  scale3.power_down();
  scale4.power_down();


  delay(2000);


  scale1.power_up();
  scale2.power_up();
  scale3.power_up();
  scale4.power_up();
    
  int hours;
  
  float humidity = dht.readHumidity();        // Read humidity
  float temperature = dht.readTemperature();            // Read temperature in Celsius
  
  DateTime now = rtc.now();

  if (counting) {
    //DateTime now = rtc.now();
    TimeSpan elapsed = now - startTime;

    int days = elapsed.days();
     hours = elapsed.hours() % 24; // Ensure hours are displayed correctly within a day
    int minutes = elapsed.minutes() % 60;
    int seconds = elapsed.seconds() % 60;

    Serial.print("Days: ");
    Serial.print(days);
    Serial.print(" Hours: ");
    Serial.print(hours);
    Serial.print(" Minutes: ");
    Serial.print(minutes);
    Serial.print(" Seconds: ");
    Serial.println(seconds);

    delay(1000); // Update every second
  }

  //////////////////////////////////////////////////////////   co2 start
  int sensorValue = analogRead(MQ135_PIN);
  
  // Convert analog value to voltage (assuming 3.3V reference)
  float voltage = sensorValue * (5 / 4095.0); // 12-bit ADC
  
  // Check for zero voltage to avoid division by zero
  if (voltage == 0) {
    Serial.println("Voltage reading is zero, check the sensor connection!");
    delay(1000);
    return;
  }

  // Convert voltage to resistance using voltage divider formula
  // Assuming a load resistance of 10k ohms (RL)
  float resistance = ((5 * RLOAD) / voltage) - RLOAD;
  
  // Check for negative resistance (should not happen)
  if (resistance <= 0) {
    Serial.println("Negative resistance, check sensor and circuit!");
    delay(1000);
    return;
  }

  float ppm = PARA * pow((resistance / RZERO), -PARB);
  

  delay(1000);  // Delay in milliseconds (1 minute)

  /////////////////////////////////////////////////////////////////////////////////// co2 end
  
  Serial.print("Humidity: ");          // Print the results to the Serial Monitor
  Serial.print(humidity);
  Serial.print(" %\t");
  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.println(" *C");
 


  Serial.print("CO2 level = ");
  Serial.print(ppm);
  Serial.print("  ppm");
  
  Serial.println();
  Serial.println("");
  Serial.println("");



  lcd.setCursor(0,0);
  lcd.print("Temperature-");
  lcd.print(temperature);



  lcd.setCursor(0,2);
  lcd.print("Gas-");
  lcd.print(ppm);
  lcd.setCursor(10,2);
  lcd.print("ppm");

  lcd.setCursor(0,1);
  lcd.print("Weight-");
  lcd.print(total);


  lcd.setCursor(0,3);
  lcd.print("Age-");
  lcd.print(hours);
  
  lcd.setCursor(9,3);
  lcd.print("Humi-");
  lcd.print(humidity);

  int data1 = firebase.getInt("syrup");
  Serial.println(data1);




  if(data1==1)
  {
    Serial.println("ONNNN.....");
    digitalWrite(13,HIGH);

  }
  else
  {

    Serial.println("OFFFF.....");
    digitalWrite(13,LOW);

  }




  







  Serial.println("Delay start");      //for check firebase delay




  String timestamp = now.timestamp(DateTime::TIMESTAMP_FULL);
  firebase.setFloat("Sensor/" + timestamp + "/temperature", temperature);
  firebase.setFloat("Sensor/" + timestamp + "/humidity", humidity);
  firebase.setInt("Sensor/" + timestamp + "/CO2lvl", ppm);
  firebase.setString("Sensor/" + timestamp + "/time", timestamp);
  firebase.setInt("Sensor/" + timestamp + "/age", hours);
  firebase.setInt("Sensor/" + timestamp + "/weight", total);


  Serial.println("Delay End");




}
