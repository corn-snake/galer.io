import 'dart:collection';

import 'package:flt/menu/login_conn.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

class LinksModel extends ChangeNotifier {
  final List<Link?> _links = [];

  UnmodifiableListView<Link?> get allLinks => UnmodifiableListView(_links);

  void addLink(Link link) {
    _links.add(link);
    notifyListeners();
  }
  void removeAll() {
    _links.clear();
    // This call tells the widgets that are listening to this model to rebuild.
    notifyListeners();
  }
}