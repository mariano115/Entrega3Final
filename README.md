En balanceProyect ejecutar "npm install"
Copiar Config de Nginx que se encuentra dentro del proyecto
nginx -s reload en la carpeta de nginx

Para la tarea de Performance Comandos:
npm i -g artillery

TAREA
1) artillery quick --count 50 -n 20 http://localhost:9090/productos > result_productos_NO_Cluster.txt
2) pm2 start index.js --name="cluster" --watch -i 4 -- --PORT=9090
(No lo ejecuto con -i max por que la computadora que utilizo tiene demasiados hilos para el proyecto)
3) artillery quick --count 50 -n 20 http://localhost:9090/productos > result_productos_SI_Cluster.txt