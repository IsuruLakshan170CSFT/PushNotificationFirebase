class Device {
  String? deviceId;
  String? deviceName;
  String? deviceToken;

  Device({this.deviceId, this.deviceName, this.deviceToken});

  Device.fromJson(Map<String, dynamic> json) {
    deviceId = json['deviceId'];
    deviceName = json['deviceName'];
    deviceToken = json['deviceToken'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['deviceId'] = this.deviceId;
    data['deviceName'] = this.deviceName;
    data['deviceToken'] = this.deviceToken;
    return data;
  }
}
