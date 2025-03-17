import 'package:flt/menu/logging.dart';
import 'package:flt/menu/login_conn.dart';
import 'package:flt/menu/side.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MainApp());
}

class MainApp extends StatefulWidget {
  const MainApp({super.key});
  
  @override
  State<StatefulWidget> createState() => _MainApp();
}

class _MainApp extends State<MainApp> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        drawer: SlideUser(ValueListenableBuilder<bool>(
          valueListenable: AS.isLoggedIn,
          builder: (BuildContext context, bool value, child)=>value ? loggedIn() : loggedOutDrawer(),
        )),
        body: SizedBox(width: double.infinity, height: double.infinity,child: Row(children: [
          SizedBox(width: 30, child: DrawerButton(),),
          SizedBox(width: 30,),
          SizedBox(width: 200, child: Text("Your Galer.io", style: TextStyle(fontWeight: FontWeight.w900, fontSize: 58),),),
          Expanded(child: 
            ValueListenableBuilder<bool>(valueListenable: AS.isLoggedIn, builder: (ctx, val, child)=> val ? ListView.builder(itemBuilder: (ctx, i)=>Card(child: Container(width: 200,height: 300, decoration: BoxDecoration(image: DecorationImage(image: NetworkImage("https://picsum.photos/200/300"))))), itemCount: 7,) : Container()),
          )
        ],)),
      ),
    );
  }
}
