import 'dart:convert';

import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter_push_notification/models/device_model.dart';
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
    Future<void> main() async {
      /// A model name.
      final identifier = 'iPhone13,4';

      final deviceName = DeviceName();
      print('device name is');

      /// Get device name from model name.
      print('device name is ${deviceName.ios(identifier)}');
      print('device name is ${await deviceName.apple(identifier)}');
    }

    getUUID();
    // sendToken();
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

  Future<void> getUUID() async {
    var uuid = Uuid();

    // Generate a v1 (time-based) id
    var v1 = uuid.v1(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'

    var v1_exact = uuid.v1(options: {
      'node': [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
      'clockSeq': 0x1234,
      'mSecs': DateTime.utc(2011, 11, 01).millisecondsSinceEpoch,
      'nSecs': 5678
    }); // -> '710b962e-041c-11e1-9234-0123456789ab'

    // Generate a v4 (random) id
    var v4 = uuid.v4(); // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1'

    // Generate a v4 (crypto-random) id
    var v4_crypto = uuid.v4(options: {'rng': UuidUtil.cryptoRNG});
    // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1'

    // Generate a v5 (namespace-name-sha1-based) id
    var v5 = uuid.v5(Uuid.NAMESPACE_URL, 'www.google.com');
    // -> 'c74a196f-f19d-5ea9-bffd-a2742432fc9c'
    // print("UUID IS :");
    // print(v1);
    // print(v1_exact);
    // print(v4);
    // print(v4_crypto);
    //  print(v5);
  }

  Future<void> sendToken() async {
    print('Send device');
    String? token;
    String? device;

    FirebaseMessaging.instance.getToken().then((value) async {
      token = value;

      DeviceInfoPlugin deviceInfo = DeviceInfoPlugin();

      if (Platform.isAndroid) {
        device = "Android Application";
        AndroidDeviceInfo androidInfo = await deviceInfo.androidInfo;
        //  print('Running on ${androidInfo.model}'); // e.g. "Moto G (4)"
        // Android-specific code
      } else if (Platform.isIOS) {
        device = "IOS Application";
        // iOS-specific code
        IosDeviceInfo iosInfo = await deviceInfo.iosInfo;
        print('Running on ${iosInfo.utsname.machine}'); // e.g. "iPod7,1"
      }
      //   print(device);

      //  print(token);
      var url = Uri.parse(
          'https://b4kwc0wdh6.execute-api.us-east-1.amazonaws.com/add_user');
      try {
        Users  _user = 
          Users(user: 'abs', device: [
            Device(
                deviceId: 'de2', deviceName: 'Android', deviceToken: '147852')
          ]);
        Map<String, String> headers = {
          'Content-type': 'application/json',
          'Accept': 'application/json',
        };
        var response =
            await http.post(url, body: json.encode(_user.toJson()), headers: headers);
        print('Response status: ${response.statusCode}');
        print('Response body: ${response.body}');
      } catch (e) {
        print('e:$e');
      }
    });
  }

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
            const Text(
              'Flutter Push notification ',
            ),
            ElevatedButton(
              onPressed: () {
                sendToken();
              },
              child: Text('Login'),
            )
          ],
        ),
      ),
    );
  }
}
