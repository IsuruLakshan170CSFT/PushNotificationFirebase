import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class DeviceData {
  static const storage = FlutterSecureStorage();

  static const _id = "id";
  static const _deviceName = "deviceName";
  static const _deviceToken = "deviceToken";
  static const _userName = "userName";

//set
  static Future setId(String id) async =>
      await storage.write(key: _id, value: id);

  static Future setDeviceName(String device) async =>
      await storage.write(key: _deviceName, value: device);

  static Future setDeviceToken(String token) async =>
      await storage.write(key: _deviceToken, value: token);

  static Future setUserName(String user) async =>
      await storage.write(key: _userName, value: user);

//get
  static Future<String?> getID() async => await storage.read(key: _id);

  static Future<String?> getDeviceName() async =>
      await storage.read(key: _deviceName);

  static Future<String?> getDeviceToken() async =>
      await storage.read(key: _deviceToken);

  static Future<String?> getUserName() async =>
      await storage.read(key: _userName);

//delete
  static Future<void> deleteId() async => await storage.delete(key: _id);

  static Future<void> deleteToken() async =>
      await storage.delete(key: _deviceToken);

  static Future<void> deleteUserName() async =>
      await storage.delete(key: _userName);
}
