CREATE TABLE usuarios(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    tipo CHAR(1),
    tipo_usuario INT,
    status CHAR(1)
);
ALTER TABLE usuarios ADD COLUMN foto varchar(255);
ALTER TABLE usuarios ADD CONSTRAINT fk_tipo_usuario FOREIGN KEY (tipo) REFERENCES tipo_usuario(id);
ALTER TABLE usuarios MODIFY COLUMN tipo INT; 

CREATE TABLE telefone(
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    ddd CHAR(3),
    numero CHAR(8),
    CONSTRAINT fk_fn_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE tipo_usuario(
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255),
    tipo CHAR(3)
);