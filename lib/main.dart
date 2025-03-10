import 'package:flt/menu/loggedout.dart';
import 'package:flt/menu/side.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        drawer: SlideUser(loggedOutDrawer()),
        body: Center(
          child: DrawerButton(),
        ),
      ),
    );
  }
}
