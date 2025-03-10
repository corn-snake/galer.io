import 'package:flutter/material.dart';

bool validateUser(String val) => RegExp(r'[a-zA-Z0-9\_\-\.\$]').hasMatch(val);
bool validatePwd(String val)=> RegExp(r'^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$').hasMatch(val);

Widget loggedOutDrawer(){
  final GlobalKey<FormState> _state_login = GlobalKey<FormState>();
  return Form(key: _state_login, child:Column(children: [
    Row(children: [
      Text("Username: ", style: TextStyle(fontSize: 17),),
      Container(width: 100, height: 40,child:TextFormField(validator:(value) => validateUser(value!) ? null : "Username may only contain non-decorated latin script letters, numbers, simple hyphens (_, -) or \$", decoration: InputDecoration(border: UnderlineInputBorder(),),))
    ],),
    Row(children: [
      Text("Password: ", style: TextStyle(fontSize: 17),),
      Container(width: 100, height: 40,child:TextFormField(validator:(value) => validatePwd(value!) ? null : "Password should be 8+ chars long, have one upper & one lower-case letter, one symbol, & a number", decoration: InputDecoration(border: UnderlineInputBorder(),), obscureText: true, autocorrect: false,))
    ],),
    SizedBox(height: 200,),
    SizedBox(width: 200,child:Row(children:[Expanded(child: Container()), ElevatedButton.icon(onPressed: ()=> _state_login.currentState!.validate()
                  ? print("ok")
                  : print("ungood"), label: Text("LogIn")), Expanded(child: Container())])),
  ]),);
}