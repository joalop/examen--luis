drop database if exists fotos;
create database fotos charset utf8mb4;
use fotos;

create table foto(
id int primary key auto_increment,
titulo varchar(50),
descripcion varchar(100),
url varchar(100),
fecha varchar(50),
megusta int,
nomegusta int);

