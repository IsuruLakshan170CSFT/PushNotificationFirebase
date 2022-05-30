import 'dart:convert';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter_push_notification/models/device_model.dart';
import 'package:flutter_push_notification/securiry/device_data.dart';
import 'package:flutter_push_notification/services/local_notification_service.dart';
import 'package:http/http.dart' as http;
import 'dart:convert' as convert;
import 'dart:io' show Platform;
import 'package:uuid/uuid.dart';
import 'package:uuid/uuid_util.dart';
import 'package:device_name/device_name.dart';
import 'package:device_info_plus/device_info_plus.dart';

import 'models/user_model.dart';

//receive message when app is in background solution for on message
Future<void> backgroundHandler(RemoteMessage message) async {
  print(message.data.toString());
  print(message.notification!.title);
}

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await Firebase.initializeApp();
  FirebaseMessaging.onBackgroundMessage(backgroundHandler);
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Push Notifications',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  void initState() {
    super.initState();
    LocalNotificationService.initialize(context);
    print("app init");

    Firebase();
    deviceName();
  }

  Future<void> deviceName() async {
    String? device = '';

    if (Platform.isAndroid) {
      DeviceInfoPlugin deviceInfo = DeviceInfoPlugin();
      AndroidDeviceInfo androidInfo = await deviceInfo.androidInfo;
      device = androidInfo.model;
    } else if (Platform.isIOS) {
      device = "IOS Application";
      // iOS-specific code
      DeviceInfoPlugin deviceInfo = DeviceInfoPlugin();
      IosDeviceInfo iosInfo = await deviceInfo.iosInfo;
      // device = iosInfo.utsname.machine;
      print('Running on ${iosInfo.utsname.machine}');
    }

    await DeviceData.setDeviceName(device!);
  }

  Future<void> Firebase() async {
//gives you the message on which user taps
    //and it opend the app from terminated state
    FirebaseMessaging.instance.getInitialMessage().then((message) {
      if (message != null) {
        final routeFromMessage = message.data["route"];
        Navigator.of(context).pushNamed(routeFromMessage);
      }
    });

    //forgound work
    FirebaseMessaging.onMessage.listen((message) {
      if (message.notification != null) {
        print(message.notification!.body);
        print(message.notification!.title);
      }
      LocalNotificationService.display(message);
    });

    //works at user on tap , app is in background not open or not open but in background
    FirebaseMessaging.onMessageOpenedApp.listen((message) {
      final routeFromMessage = message.data["route"];
      Navigator.of(context).pushNamed(routeFromMessage);
      print(routeFromMessage);
    });
  }

  Future<void> getUser() async {
    var uuid = Uuid();
    var v1 = uuid.v1();
    print("v1 : " + v1);

    DeviceData.setId(v1);
    FirebaseMessaging.instance.getToken().then((value) async {
      //set device token
      DeviceData.setDeviceToken(value.toString());
    });
  }

  Future<void> setCredentials(endpoint, userName) async {
    if (endpoint == "add_user") {
      DeviceData.setUserName(userName);
      getUser();
    }

    String? id = await DeviceData.getID();
    String? device = await DeviceData.getDeviceName();
    String? token = await DeviceData.getDeviceToken();
    String? user = await DeviceData.getUserName();
    print("id ; " + id!);
    print("device ; $device");
    var url = Uri.parse(
        'https://b4kwc0wdh6.execute-api.us-east-1.amazonaws.com/$endpoint');
    try {
      Users _user = Users(user: user, device: [
        Device(deviceId: id, deviceName: device, deviceToken: token)
      ]);
      Map<String, String> headers = {
        'Content-type': 'application/json',
        'Accept': 'application/json',
      };
      var response = await http.post(url,
          body: json.encode(_user.toJson()), headers: headers);
      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');

      if (endpoint == "delete") {
        print(" delete ");
        DeviceData.deleteId();
        DeviceData.deleteToken();
        DeviceData.deleteUserName();
        String? deletetoken = await DeviceData.getDeviceToken();
        String? deleteid = await DeviceData.getID();
        String? deleteuser = await DeviceData.getUserName();
        //print(deleteid);
        // print(deletetoken);
        print(deleteuser);
        print("clear all");
      }
      setState(() {
        isLoading = false;
      });
    } catch (e) {}
  }

  final myController = TextEditingController();
  bool isLogin = false;
  String buttonText = "Login";
  bool isLoading = false;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Container(
                width: 100.0,
                child: TextField(
                    controller: myController,
                    style: TextStyle(
                        fontSize: 20.0, height: 2.0, color: Colors.black))),
            ElevatedButton(
              onPressed: () {
                if (isLogin == false) {
                  setCredentials("add_user", myController.text);
                  isLogin = true;
                  myController.text = '';
                  setState(() {
                    isLoading = true;
                    buttonText = 'Logout';
                  });
                } else if (isLogin == true) {
                  setCredentials("delete", myController.text);
                  isLogin = false;
                  setState(() {
                    isLoading = true;
                    buttonText = 'Login';
                  });
                }
              },
              child: isLoading
                  ? CircularProgressIndicator(color: Colors.white)
                  : Text(buttonText),
            )
          ],
        ),
      ),
    );
  }
}
