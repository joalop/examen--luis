drop database if exists fotos;
create database fotos charset utf8mb4;
use fotos;

create table foto(
id int primary key auto_increment,
titulo varchar(50),
descripcion varchar(100),
url varchar(300),
fecha varchar(100),
megusta int,
nomegusta int);

insert into foto (id, titulo, descripcion, url, fecha, megusta, nomegusta)
values(
null,
'Indiana Jones',
'Indiana Jones y la nueva cruzada',
'https://jorgecine1997.files.wordpress.com/2020/11/mv5bzdiznzm5mdutzmi5mc00ngq5lwflnzetyze3odixndi3zmnhxkeyxkfqcgdeqxvynjq4ode4mzq40._v1_.jpg',
'2023-02-22T010:22:06.761Z (hora estándar de Europa central)',
0,
0
);