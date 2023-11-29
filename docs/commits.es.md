Este repositorio sigue, a rasgos generales, la especificación de [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

A continuación se resumen las reglas generales de dicha especificación y se detallan las reglas especícicas de este proyecto.

## Mensajes de commit

Un mensaje de commit consiste en un encabezado, un cuerpo y un pie de página. El encabezado tiene un formato especial que incluye un tipo, un alcance y un asunto:

```text
<type>(refs): <description>

[cuerpo]

[pie de página]
```

En la siguiente sección se detallan los tipos de commit permitidos. El alcance, indicado por _refs_, siempre debe ser una lista (separada con comas y espacios) de una o más referencias a elementos en GitHub, con el formato `#<número>`. El asunto debe ser una descripción corta y concisa del cambio realizado.

## Tipos de commit

Los tipos de commit permitidos son:

-   **feat**: Una nueva funcionalidad.
-   **fix**: Una corrección de un error.
-   **docs**: Cambios en la documentación del repositorio. El parámetro de alcance es opcional en estos casos.
-   **data**: Cambios en los ficheros de datos. Opcionalmente, puede incluir cambios relacionados en los ficheros de localización.
-   **chore**: Tareas rutinarias de mantenimient (actualización de dependencias, mejoras de cobertura de tests, etc.). El parámetro de alcance es opcional para commits generados automáticamente por herramientas (p.ej: dependabot).
-   **minor**: Cambios de pequeño tamaño e impacto (correcciones menores a textos, cambios de estilo triviales, etc.). El parámetro de alcance es opcional en estos casos.
