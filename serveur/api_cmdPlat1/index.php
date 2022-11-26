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
        $sql = "SELECT id, clients_id,plats_id,sum(quantite) as quantite,montant ,sum(montant) as total FROM commander_plat group by plats_id";
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
        $sql = "INSERT INTO commander_plat(id,clients_id, plats_id, quantite, montant) VALUES(null, :clients_id, :plats_id, :quantite, :montant)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':clients_id', $user->clients_id);
        $stmt->bindParam(':plats_id', $user->plats_id);
        $stmt->bindParam(':quantite', $user->quantite);
        $stmt->bindParam(':montant', $user->montant);
        
    
        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;
    case "PUT":
        $user = json_decode( file_get_contents('php://input') );
        $sql = "UPDATE commander_plat SET clients_id= :clients_id, plats_id= :plats_id, quantite= :quantite, montant= :montant  WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $user->id);
        $stmt->bindParam(':clients_id', $user->clients_id);
        $stmt->bindParam(':plats_id', $user->plats_id);
        $stmt->bindParam(':quantite', $user->quantite);
        $stmt->bindParam(':montant', $user->montant);
        
        
        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update record.'];
        }
        echo json_encode($response);
        break;
    case "DELETE":
        $sql = "DELETE FROM commander_plat WHERE id = :id";
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
