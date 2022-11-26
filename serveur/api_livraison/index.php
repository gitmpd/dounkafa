<?php 
 error_reporting(E_ALL);
 ini_set('display_errors', 1);
 header("Access-Control-Allow-Origin: *");
 header("Access-Control-Allow-Headers: *");
 header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case 'GET':
        $sql = "SELECT * FROM livraison";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[4]) && is_numeric($path[4])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[4]);
            $stmt->execute();
            $clients = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $clients = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        echo json_encode($clients);
        break;
    case "POST":
        $user = json_decode( file_get_contents('php://input') );
        $sql = "INSERT INTO livraison (id,commander_plat_id, livreur_id, date, montant, lieu) VALUES(null, :commander_plat_id, :livreur_id, :date, :montant, :lieu)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':commander_plat_id', $user->commander_plat_id);
        $stmt->bindParam(':livreur_id', $user->livreur_id);
        $stmt->bindParam(':date', $user->date);
        $stmt->bindParam(':montant', $user->montant);
        $stmt->bindParam(':lieu', $user->lieu);
    
        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;
    case "PUT":
        $user = json_decode( file_get_contents('php://input') );
        $sql = "UPDATE livraison SET commander_plat_id= :commander_plat_id, livreur_id= :livreur_id, date= :date, montant= :montant ,lieu= :lieu WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $user->id);
        $stmt->bindParam(':commander_plat_id', $user->commander_plat_id);
        $stmt->bindParam(':livreur_id', $user->livreur_id);
        $stmt->bindParam(':date', $user->date);
        $stmt->bindParam(':montant', $user->montant);
        $stmt->bindParam(':lieu', $user->lieu);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update record.'];
        }
        echo json_encode($response);
        break;
    case "DELETE":
        $sql = "DELETE FROM livraison WHERE id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);
    
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[4]);
    
        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete record.'];
        }
        echo json_encode($response);
        break;
}
