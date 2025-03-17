import 'dart:convert';
import 'dart:math';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

import 'package:crypto/crypto.dart';

final storage = FlutterSecureStorage();

final rn = Random().nextInt(2048), d = DateTime.now().millisecondsSinceEpoch;

String baseUrl = "http://localhost";

class ApiService {
  late String tknhash;
  ValueNotifier<bool> isLoggedIn = ValueNotifier<bool>(false);
  void toggleLog()=>isLoggedIn.value = !isLoggedIn.value;
  void exex(String uname, String pwd) {
    print(sha512.convert(utf8.encode("$rn+$d+$uname")));
    print(sha512.convert(utf8.encode(pwd)));
  }
  Future<List<Link?>> register (String uname, String pwd, context) async {
    final String tknhash = sha512.convert(utf8.encode("$rn+$d+$uname")).toString();
    final response = await http.post(
      Uri.parse("$baseUrl/signup"),
      body: "[\"$uname\",\"${sha512.convert(utf8.encode("$rn+$d+$uname")).toString()}\",\"${sha512.convert(utf8.encode(pwd)).toString()}\"]"
    );
    if (response.statusCode != 200) {
      return [null];
    }
    Navigator.pop(context);
    Map<String, dynamic> data = json.decode(response.body);
    await storage.write(key: 'tknhash', value: tknhash);
    await storage.write(key: 'uname', value: uname);
    toggleLog();
    if(data["places"] == null) return [];
    return data["places"] == null
        ? []
        : List.generate(data["places"].length, (ke) => Link.fromJson(data["places"][ke]));
  }
  Future<List<Link?>> login (String uname, String pwd, context) async {
    // [uname,phash,tknhash]
    final String tknhash = sha512.convert(utf8.encode("$rn+$d+$uname")).toString(),
      pwdhash = sha512.convert(utf8.encode(pwd)).toString();
    final response = await http.post(Uri.parse("$baseUrl/login"), body: "[\"$uname\",\"$pwdhash\",\"$tknhash\"]");
    if (response.statusCode == 401) {print("wrong pwd"); return [];}
    if (response.statusCode == 404) {print("wrong uname"); return [];}
    Navigator.pop(context);
    Map<String, dynamic> data = json.decode(response.body);
    await storage.write(key: 'tknhash', value: tknhash);
    await storage.write(key: 'uname', value: uname);
    toggleLog(); 
    return data["places"] == null ? [] : List.generate(data["places"].length, (ke)=>Link.fromJson(data["places"][ke]));
  }
  Future<List<Link?>> logout () async {
    final response = await http.post(Uri.parse("$baseUrl/logout"), body: await storage.read(key: "tknhash"));
    if (response.statusCode == 204) {
      toggleLog();
      storage.delete(key: "uname");
    };
    return [null];
  }
  Future<List<Link>> initFetch(String uname, String pwd) async {
    final response = await http.post(
      Uri.parse("$baseUrl/signup"),
      body: [uname, sha512.convert(utf8.encode("$rn+$d+$uname")).toString(), sha512.convert(utf8.encode(pwd)).toString()]
    );
    if (response.statusCode == 200) {
      Map<String, dynamic> data = json.decode(response.body);
      toggleLog();
      if (data["Response"] == "True") {
        List<dynamic> results = data['Search'];
        return results.map((json) => Link.fromJson(json)).toList();
      } else {
        return [];
      }
    } else {
      throw Exception("Error al cargar");
    }
  }
}

class Link {
  final String user;
  final String type;
  final String into;

  Link({
    required this.user,
    required this.type,
    required this.into,
  });

  factory Link.fromJson(Map<String, dynamic> json) {
    return Link(
      user: json['user'],
      type: json['type'],
      into: json['into'],
    );
  }
}

ValueNotifier<List<Link?>> feeder = ValueNotifier<List<Link?>>([]);

final AS = ApiService();