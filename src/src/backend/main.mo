import Map "mo:core/Map";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Int "mo:core/Int";
import Nat "mo:core/Nat";

actor {
  type Purchase = {
    customerName : Text;
    timestamp : Time.Time;
  };

  module Purchase {
    public func compare(purchase1 : Purchase, purchase2 : Purchase) : Order.Order {
      Int.compare(purchase2.timestamp, purchase1.timestamp);
    };
  };

  let purchases = Map.empty<Text, Purchase>();

  public shared ({ caller }) func recordPurchase(customerName : Text) : async () {
    let purchase : Purchase = {
      customerName;
      timestamp = Time.now();
    };
    purchases.add(customerName, purchase);
  };

  public query ({ caller }) func getRecentPurchases(limit : Nat) : async [Purchase] {
    let sortedPurchases = purchases.values().toArray().sort();
    switch (Nat.compare(sortedPurchases.size(), limit)) {
      case (#less) { sortedPurchases };
      case (_) { sortedPurchases.sliceToArray(0, limit) };
    };
  };
};
