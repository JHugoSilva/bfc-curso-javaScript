<?php
ini_set('display_errors',1);
ini_set('display_startup_erros',1);
error_reporting(E_ALL);
require_once '../../conexao.php';
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':
        $sql = "SELECT * FROM usuarios";
        if (!empty($_GET['id'])){
           $sql .= " WHERE id ='{$_GET['id']}'";
        }
        $sql = $conn->query($sql);
        $dados = $sql->fetchAll(PDO::FETCH_ASSOC);
        $retorno = ['status' => true, 'dados' => $dados];
    break;
    case 'POST':
        $post = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO usuarios(nome, tipo, status, foto) VALUES(:nome, :tipo, :status, :foto)";
        $sql = $conn->prepare($sql);
        $sql->bindValue(':nome', $post->nome);
        $sql->bindValue(':tipo', $post->tipo);
        $sql->bindValue(':status', $post->status);
        
        define('UPLOAD_DIR', 'uploads/');
        $img = $post->f_foto;
        $img = str_replace('data:image/jpeg;base64,', '', $img);
        $data = base64_decode($img);
        $file = UPLOAD_DIR . uniqid() . '.jpeg';
        $success = file_put_contents($file, $data);
        $sql->bindValue(':foto', $file);
        $data1[] = $file;

        if ($sql->execute()) {
            $idUser = $conn->lastInsertId();
            $fone = $post->numTelefone;
            fones($fone, $conn, $idUser);
        }
        $retorno = ['status' => true, 'dados' => 'ok'];
    break;
    case 'PUT':
        $post = json_decode(file_get_contents('php://input'));
        $sql = "UPDATE usuarios SET nome=:nome, tipo=:tipo, status=:status, foto=:foto WHERE id=:id";
        $sql = $conn->prepare($sql);
        $sql->bindValue(':nome', $post->nome);
        $sql->bindValue(':tipo', $post->tipo);
        $sql->bindValue(':status', $post->status);
        $sql->bindValue(':id', $post->id);
        if (!empty($post->numTelefone)) {
            fones($post->numTelefone, $conn, $post->id);
        }
        if (!empty($post->f_foto)) {
            $sql2 = "SELECT foto FROM usuarios WHERE id='{$post->id}'";

            $sql2 = $conn->query($sql2);
            if ($sql2->rowCount() > 0) {
                $fotoR = $sql2->fetch(PDO::FETCH_ASSOC);
                @unlink($fotoR['foto']);
            }
            define('UPLOAD_DIR', 'uploads/');
            $img = $post->f_foto;
            $imgUpload = tf_convert_base64_to_image($img, UPLOAD_DIR);
            $sql->bindValue(':foto', $imgUpload);
        }
        $sql->execute();
        $retorno = ['status' => true, 'dados' => $file];
    break;
}

function tf_convert_base64_to_image( $base64_code, $path, $image_name = null ) {
     
    if ( !empty($base64_code) && !empty($path) ) :
        // split the string to get extension and remove not required part
        // $string_pieces[0] = to get image extension
        // $string_pieces[1] = actual string to convert into image
        $string_pieces = explode( ";base64,", $base64_code);
 
        /*@ Get type of image ex. png, jpg, etc. */
        // $image_type[1] will return type
        $image_type_pieces = explode( "image/", $string_pieces[0] );
 
        $image_type = $image_type_pieces[1];
 
        /*@ Create full path with image name and extension */
        $store_at = $path.md5(uniqid()).'.'.$image_type;
 
        /*@ If image name available then use that  */
        if ( !empty($image_name) ) :
            $store_at = $path.$image_name.'.'.$image_type;
        endif;
 
        $decoded_string = @base64_decode( $string_pieces[1] );
 
        file_put_contents( $store_at, $decoded_string );
        return $store_at;
    endif;
 
}

function fones($fones, $conn, $id) {
    foreach ($fones as $fone) {
        $sql = "INSERT INTO telefone(usuario_id, ddd, numero)VALUES('{$id}', '852', '{$fone}')";
        $conn->query($sql);
    }
}

echo json_encode($retorno);