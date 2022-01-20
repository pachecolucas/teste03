<?php
// Mostra erros
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Conecta na base
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$conn = mysqli_connect("199.201.90.12", "phpmyadm_70", "#Bru1234", "phpmyadm_70");
mysqli_set_charset($conn, "utf8mb4");

// Pega os Alunos
$result = mysqli_query($conn, "SELECT id, nome, idade FROM alunos");

// Converte resultado para array
$alunos = [];
while ($r = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
    $alunos[] = $r;
}

// Retorna JSON
header('Content-Type: application/json; charset=utf-8');
echo json_encode($alunos);
