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
      title: 'Flutter Demo',
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
    //set device id
    // saveToken(v1);

    DeviceData.setId(v1);

    FirebaseMessaging.instance.getToken().then((value) async {
      String? device;
      //set device token
      DeviceData.setDeviceToken(value.toString());
      DeviceInfoPlugin deviceInfo = DeviceInfoPlugin();
      if (Platform.isAndroid) {
        device = "Android Application";
        AndroidDeviceInfo androidInfo = await deviceInfo.androidInfo;
        /* print('Running on ${androidInfo.device}'); // e.g. "Moto G (4)"
        print('Running on ${androidInfo.brand}');
        print('Running on ${androidInfo.bootloader}');
        print('Running on ${androidInfo.display}');
        print('Running on ${androidInfo.hardware}');
        print('Running on ${androidInfo..product}');

        print('Running on ${androidInfo.androidId}');
        print('Running on ${androidInfo.manufacturer}');
        print('Running on ${androidInfo.model}');
        print('Running on ${androidInfo.type}'); */
        device = androidInfo.model;
      } else if (Platform.isIOS) {
        device = "IOS Application";
        // iOS-specific code
        IosDeviceInfo iosInfo = await deviceInfo.iosInfo;
        device = iosInfo.utsname.machine;
        print('Running on ${iosInfo.utsname.machine}');
      }
      //set device name
      DeviceData.setDeviceName(device.toString());
    });
  }

  Future<void> setCredentials(endpoint, userName) async {
    if (endpoint == "add_user") {
      getUser();
    }

    String? id = await DeviceData.getID();
    String? name = await DeviceData.getDeviceName();
    String? token = await DeviceData.getDeviceToken();
    print("id ; " + id!);

    var url = Uri.parse(
        'https://b4kwc0wdh6.execute-api.us-east-1.amazonaws.com/$endpoint');
    try {
      Users _user = Users(
          user: userName,
          device: [Device(deviceId: id, deviceName: name, deviceToken: token)]);
      Map<String, String> headers = {
        'Content-type': 'application/json',
        'Accept': 'application/json',
      };
      var response = await http.post(url,
          body: json.encode(_user.toJson()), headers: headers);
      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');

      if (endpoint == "delete") {
        DeviceData.deleteAllSecureData();
      }
    } catch (e) {}
  }

  final myController = TextEditingController();
  bool isLogin = false;
  String buttonText = "Login";

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
                  setState(() {
                    buttonText = 'Logout';
                  });
                } else if (isLogin == true) {
                  setCredentials("delete", myController.text);
                  isLogin = false;
                  setState(() {
                    buttonText = 'Login';
                  });
                }
              },
              child: Text(buttonText),
            )
          ],
        ),
      ),
    );
  }
}
