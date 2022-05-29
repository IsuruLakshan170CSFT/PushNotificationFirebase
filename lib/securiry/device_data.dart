import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class DeviceData {
  static const storage = FlutterSecureStorage();

  static const _id = "id";
  static const _deviceName = "deviceName";
  static const _deviceToken = "deviceToken";

  static Future setId(String id) async =>
      await storage.write(key: _id, value: id);

  static Future setDeviceName(String device) async =>
      await storage.write(key: _deviceName, value: device);

  static Future setDeviceToken(String token) async =>
      await storage.write(key: _deviceToken, value: token);

  static Future<String?> getID() async => await storage.read(key: _id);

  static Future<String?> getDeviceName() async =>
      await storage.read(key: _deviceName);

  static Future<String?> getDeviceToken() async =>
      await storage.read(key: _deviceToken);

  static Future<void> deleteAllSecureData() async => await storage.deleteAll();
}
