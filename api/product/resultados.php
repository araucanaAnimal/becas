<?php

$rut = $_GET['rut'];
 //echo $rut ;

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/resultado.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$resultado = new Resultado($db);
$stmt = "";

if (!empty($rut)){

    $products_arr = array();
    $products_arr["success"] = true;
    $products_arr["message"] = "becados";
    $products_arr["results"]["data"] = array();

    $products_arr["provider_name"] = "animalCreativo";
    $products_arr["provider_url"] = "http://www.animalcreativo.com";
    $products_arr["version"] = "1.0";


    $stmt = $resultado->buscar($rut);   

    $num = $stmt->rowCount();
     
    // check if more than 0 record found
    if($num>0){
     
        // products array
       // $products_arr=array();
       // $products_arr["data"]=array();
     
        // retrieve our table contents
        // fetch() is faster than fetchAll()
        // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            // extract row
            // this will make $row['name'] to
            // just $name only
            extract($row);
     
            $product_item=array(
                "id" => $id,
                "rut_afiliado" => $rut_afiliado,
                "nombre_afiliado" => $nombres_afiliado,
                "apellidos_afiliado" => $apellidos_afiliado,
                "nombre_postulante" => $nombres_postulante,
                "apellidos_postulante" => $apellidos_postulante,
                "nombre_beca" => $nombre_beca,
                "tipo_premio" => $tipo_premio,
                "premio" => $premio,
                "tiene_premio" => $tiene_premio,
                "mensaje" => $Mensaje
            );
     
            array_push($products_arr["results"]["data"], $product_item);
        }
     
        echo json_encode($products_arr);
    }
     
    else{
        echo json_encode(
            array("message" => "No hay informacion.")
        );
    }
}
?>