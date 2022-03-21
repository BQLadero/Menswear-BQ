<?php
$tiempo = time(); //Fecha Actual | Devuelve los segundos que han pasado desde 1970
$fecha = getdate($tiempo); //Pasar a un formato mejor | Devuelve un array
$fechFormat = $fecha['mday']."-".$fecha['mon']."-".$fecha['year'];

    if(isset($_POST['grabar'])){
        $backup = $_POST['backup'];
        $string = $fechFormat.".txt";
       $archivo= fopen("./backUp/$string","a+")or die("Error al abrir el archivo");
       fwrite($archivo,$backup);

       fclose($archivo);
    }
?>