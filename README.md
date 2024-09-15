# BeeWise: Smart Beehive Monitoring System

**BeeWise** is an innovative solution designed to optimize hive productivity and ensure bee welfare through real-time monitoring and automation. By integrating sensors and other hardware components, this system helps beekeepers monitor critical hive conditions like temperature, humidity, weight, and hive age, and even automate feeding during adverse weather conditions.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Components](#components)
- [Installation](#installation)
- [Usage](#usage)
- [Hardware Setup](#hardware-setup)
- [System Block Diagram](#system-block-diagram)
- [Contributors](#contributors)
- [License](#license)

## Introduction

Traditional beekeeping methods rely heavily on manual, intermittent inspections, making it challenging to effectively monitor and manage hives. **BeeWise** addresses this by providing real-time data collection, analysis, and automated interventions to enhance hive productivity and improve bee health.

## Features

- **Temperature and Humidity Monitoring:** Real-time monitoring of hive temperature and humidity using the DHT21 sensor to ensure optimal environmental conditions.
- **Hive Weight Monitoring:** Load cells track hive weight to monitor honey production and detect anomalies.
- **Hive Age Tracking:** A Real-Time Clock (RTC) module records the age of the hive, offering insights into hive lifecycle and productivity trends.
- **Automated Feeding:** A mini water pump system provides sugar syrup to bees during nectar scarcity or adverse weather.
- **Gas Monitoring:** MQ-135 sensor monitors CO₂ levels in the hive, ensuring proper ventilation and preventing overcrowding.
- **Real-Time Data Display:** An LCD screen shows hive weight, age, and other critical metrics.
- **Remote Monitoring:** A web application provides beekeepers with remote access to real-time hive data for decision-making.

## Components

1. **NodeMCU ESP32 WROOM-32U:** Main microcontroller for data collection and Wi-Fi communication.
2. **DHT21 Sensor:** Monitors temperature and humidity.
3. **Load Cells with HX711 Amplifier:** Tracks hive weight.
4. **Real-Time Clock (RTC) Module:** Records hive age.
5. **Mini Water Pump:** Automates the feeding process.
6. **MQ-135 Gas Sensor:** Monitors CO₂ levels in the hive.
7. **24x4 LCD Display:** Displays real-time hive information.
8. **XL4015 DC to DC Step-Down Power Module:** Manages power supply for various components.

## Installation

### Hardware Setup

1. Connect the ESP32 to the sensors (DHT21, load cells with HX711, MQ-135, and RTC module) and actuators (water pump and LCD).
2. Power the system using a suitable power source with the XL4015 DC to DC converter.
3. Solder all components on the custom-designed PCB to ensure a reliable connection.
4. Upload the code to the ESP32 using the Arduino IDE.

### Software Setup

1. Install the [Arduino IDE](https://www.arduino.cc/en/software) if not already installed.
2. Install the following libraries in the Arduino IDE:
   - ESP32 Board Support
   - DHT Sensor Library
   - HX711 Load Cell Library
   - RTC Library
   - Adafruit LCD Library
   - MQ-135 Library

3. Clone the repository:

```bash
git clone https://github.com/yourusername/BeeWise.git
cd BeeWise
