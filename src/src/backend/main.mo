import Map "mo:core/Map";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Int "mo:core/Int";
import Text "mo:core/Text";


// Use migration pattern for data persistence on upgrades

actor {
  type PaymentStatus = {
    #Pending;
    #Completed;
    #Failed;
  };

  type PaymentRecord = {
    customerName : Text;
    email : Text;
    phone : Text;
    plan : Text;
    amount : Nat;
    timestamp : Time.Time;
    status : PaymentStatus;
    transactionId : ?Text;
  };

  // PaymentRecord array comparison by timestamp
  module PaymentRecord {
    public func compare(record1 : PaymentRecord, record2 : PaymentRecord) : Order.Order {
      Int.compare(record2.timestamp, record1.timestamp);
    };
  };

  let paymentRecords = Map.empty<Text, PaymentRecord>();

  let validAmounts = [49, 299, 699];
  let adminPassword = "techify2024";

  // Validate input data
  func validatePaymentRequest(customerName : Text, email : Text, phone : Text, amount : Nat) {
    if (customerName.isEmpty()) {
      Runtime.trap("Customer name cannot be empty");
    };

    if (phone.isEmpty()) {
      Runtime.trap("Phone number cannot be empty");
    };

    if (validAmounts.find(func(x) { x == amount }) == null) {
      Runtime.trap("Invalid amount. Must be 49, 299, or 699");
    };
  };

  // Create new payment request
  public shared ({ caller }) func createPaymentRequest(
    customerName : Text,
    email : Text,
    phone : Text,
    plan : Text,
    amount : Nat,
  ) : async Text {
    validatePaymentRequest(customerName, email, phone, amount);

    let orderId = paymentRecords.size().toText() # Time.now().toText();

    let paymentRecord : PaymentRecord = {
      customerName;
      email;
      phone;
      plan;
      amount;
      timestamp = Time.now();
      status = #Pending;
      transactionId = null;
    };

    paymentRecords.add(orderId, paymentRecord);
    orderId;
  };

  // Update payment status and transaction ID
  public shared ({ caller }) func updatePaymentStatusWithTransactionId(
    adminPasswordInput : Text,
    orderId : Text,
    status : PaymentStatus,
    transactionId : ?Text,
  ) : async () {
    if (adminPasswordInput != adminPassword) {
      Runtime.trap("Invalid admin password");
    };

    switch (paymentRecords.get(orderId)) {
      case (null) { Runtime.trap("Order ID not found") };
      case (?record) {
        let updatedRecord : PaymentRecord = {
          record with
          status;
          transactionId
        };
        paymentRecords.add(orderId, updatedRecord);
      };
    };
  };

  // Get payment record by order ID
  public query ({ caller }) func getPaymentRecord(orderId : Text) : async ?PaymentRecord {
    paymentRecords.get(orderId);
  };

  // Get all payments (admin view)
  public query ({ caller }) func getAllPayments() : async [PaymentRecord] {
    paymentRecords.values().toArray();
  };

  // Get payments by status
  public query ({ caller }) func getPaymentsByStatus(status : PaymentStatus) : async [PaymentRecord] {
    let payments = paymentRecords.values().toArray();
    payments.filter(func(record) { record.status == status });
  };

  // Count total payments
  public query ({ caller }) func getTotalPaymentsCount() : async Nat {
    paymentRecords.size();
  };

  // Count payments by status
  public query ({ caller }) func getPaymentsCountByStatus(status : PaymentStatus) : async Nat {
    var count = 0;
    for (record in paymentRecords.values()) {
      if (record.status == status) {
        count += 1;
      };
    };
    count;
  };

  // Get recent payments (sorted by timestamp)
  public query ({ caller }) func getRecentPayments(limit : Nat) : async [PaymentRecord] {
    let sortedPayments = paymentRecords.values().toArray().sort();
    switch (Nat.compare(sortedPayments.size(), limit)) {
      case (#less) { sortedPayments };
      case (_) { sortedPayments.sliceToArray(0, limit) };
    };
  };

  // Get all completed payments (for admin)
  public query ({ caller }) func getAllCompletedPayments() : async [PaymentRecord] {
    let payments = paymentRecords.values().toArray();
    payments.filter(func(record) { record.status == #Completed });
  };

  // Check if payment exists
  public query ({ caller }) func paymentExists(orderId : Text) : async Bool {
    paymentRecords.containsKey(orderId);
  };

  // Helper to compare PaymentRecords by timestamp (newest first)
  func comparePaymentRecordsByTimestamp(a : PaymentRecord, b : PaymentRecord) : Order.Order {
    Int.compare(b.timestamp, a.timestamp);
  };
};
