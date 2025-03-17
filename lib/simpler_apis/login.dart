import 'package:http/http.dart' as http;

String baseUrl = "http://localhost";

class ApiService_Simple {
  void fakeLogin(String uname, String pwd) async {
    final response =
        await http.post(Uri.parse("$baseUrl/mock_login"), body: "[\"$uname\",\"$pwd\"]");
    print(response);
  }
}

final ASimple = ApiService_Simple();