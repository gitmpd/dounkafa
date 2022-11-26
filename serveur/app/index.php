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
        $sql = "SELECT * FROM utilisateur";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[4]) && is_numeric($path[4])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[4]);
            $stmt->execute();
            $users = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        echo json_encode($users);
        break;
    case "POST":
        $user = json_decode( file_get_contents('php://input') );
        $sql = "INSERT INTO utilisateur(id, nom, prenom, email, password) VALUES(null, :nom, :prenom, :email, :password)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':nom', $user->nom);
        $stmt->bindParam(':prenom', $user->prenom);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':password', $user->password);
    
        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;
    case "PUT":
        $user = json_decode( file_get_contents('php://input') );
        $sql = "UPDATE utilisateur SET nom= :nom, prenom= :prenom, email =:email, password =:password WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $user->id);
        $stmt->bindParam(':nom', $user->nom);
        $stmt->bindParam(':prenom', $user->prenom);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':password', $user->password);
    
        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update record.'];
        }
        echo json_encode($response);
        break;
    case "DELETE":
        $sql = "DELETE FROM utilisateur WHERE id = :id";
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
