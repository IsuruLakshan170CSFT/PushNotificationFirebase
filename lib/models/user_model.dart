import 'device_model.dart';

class Users {
 late String? user;
  late List<Device>? device;

  Users({this.user, this.device});

  Users.fromJson(Map<String, dynamic> json) {
    user:
    json['user'];
    var device = <Device>[];
    if (json['device'] != null) {
      json['device'].forEach((v) {
        device.add(Device.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = Map<String, dynamic>();
    data['user'] = this.user;
    if (this.device != null) {
      data['device'] = this.device!.map((v) => v.toJson()).toList();
    }
    return data;
  }
}
