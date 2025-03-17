import 'package:flt/menu/login_conn.dart';
import 'package:flutter/material.dart';

bool validateUser(String val) => RegExp(r'[a-zA-Z0-9\_\-\.\$]{4,}').hasMatch(val);
bool validatePwd(String val)=> RegExp(r'^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$').hasMatch(val);

Container isBad(msg)=> Container(child:Text(msg, style: TextStyle(fontSize: 12, fontStyle: FontStyle.italic, color: Colors.redAccent)));

class loggedOutDrawer extends StatefulWidget {
  const loggedOutDrawer({super.key});

  @override
  State<StatefulWidget> createState() => _loggedOutDrawer();
  
}
class _loggedOutDrawer extends State<loggedOutDrawer>{
  final GlobalKey<FormState> _state_login = GlobalKey<FormState>();
  String _pwdMsg = "", _usrMsg = "", _pwd="", _uname="";
  bool isIn = false;

  void wrongP()=>setState(()=>_pwdMsg = "Password should be 8+ chars long, have one upper & one lower-case letter, one symbol, & a number");
  void rightP(String v)=>setState((){_pwdMsg = "";_pwd=v;});

  void wrongU()=>setState(()=>_usrMsg= "Username may only contain non-decorated latin script letters, numbers, simple hyphens (_, -) or \$");
  void rightU(String v)=>setState((){_usrMsg="";_uname=v;});

  String? isPwd(String value){
    if (validatePwd(value)) {
      rightP(value);
      return null;
    }
    wrongP();
    return "";
  }
  String? isUsr(String value){
    if (validateUser(value)) {
      rightU(value);
      return null;
    }
    wrongU();
    return "";
  }

  late String tknhash;

  @override
  Widget build(BuildContext context) => Form(key: _state_login, child:Column(children: [
    Row(children: [
      Text("Username: ", style: TextStyle(fontSize: 17),),
      Column(children: [
        Container(width: 100, height: 40,child:
          TextFormField(validator:(value) => isUsr(value!),
            decoration: InputDecoration(border: UnderlineInputBorder(),),)
        )
      ])
    ],),
        isBad(_usrMsg),
    Row(children: [
      Text("Password: ", style: TextStyle(fontSize: 17),),
      Column(children:[
        Container(width: 100, height: 40,child:
          TextFormField(validator:(value) => isPwd(value!),
            decoration: InputDecoration(border: UnderlineInputBorder(),), obscureText: true, autocorrect: false,
          )
        )
      ])
    ],),
        isBad(_pwdMsg),
    SizedBox(height: 200,),
    SizedBox(width: 200,child:Row(children:[Expanded(child: Container()), ElevatedButton.icon(onPressed: ()async=> _state_login.currentState!.validate()
                  ? feeder.value = await AS.login(_uname, _pwd, context)
                  : null, label: Text("LogIn")), Expanded(child: Container())])),
    SizedBox(height: 100,),
    SizedBox(width: 200,child:Row(children:[Expanded(child: Container()), ElevatedButton.icon(onPressed: ()async=> _state_login.currentState!.validate()
                  ? feeder.value = await AS.register(_uname, _pwd, context)
                  : null, label: Text("Registrarse")), Expanded(child: Container())])),
  ]),);
}

class loggedIn extends StatefulWidget {
  const loggedIn({super.key});

  @override
  State<StatefulWidget> createState() => _loggedIn();
}
class _loggedIn extends State<loggedIn> {
  String? uname;
  void getName()async {String? nn = await storage.read(key: "uname");setState(()=>uname = nn);}
  @override void initState() {
    super.initState();
  }
  @override
  Widget build(BuildContext context) {
    getName();
    return Column(children:[
    Text("Welcome, $uname", style: TextStyle(fontWeight: FontWeight.bold)),
    SizedBox(height: 100),
    Row(children:[
      Expanded(child:Container()),
      ElevatedButton(onPressed: ()async=>feeder.value = await AS.logout(),child: Text("Cerrar Sesión")),
      Expanded(child: Container())
    ])
  ]);}
}