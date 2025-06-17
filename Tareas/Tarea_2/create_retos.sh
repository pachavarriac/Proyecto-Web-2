#!/run/current-system/sw/bin/bash

for i in {1..10}; do
  # Formatear el número con un cero adelante si es menor a 10
  num=$(printf "%02d" $i)
  # Crear el archivo
  touch "reto_${num}.html"
done

echo "Archivos creados exitosamente."
