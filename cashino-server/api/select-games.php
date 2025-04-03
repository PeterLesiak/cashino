<?php

require_once __DIR__ . '/../database.php';
require_once __DIR__ . '/../enums.php';

$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);

$provider = $input['provider'] ?? null;
$gameName = $input['gameName'] ?? null;
$sortCriteria = $input['sortCriteria'] ?? 'popular';
$sortOrder = $input['sortOrder'] ?? 'descending';

[$query, $bindParams] = buildQuery($provider, $gameName, $sortCriteria, $sortOrder);
$stmt = $database->prepare($query);
if ($provider || $gameName) {
    $stmt->bind_param(str_repeat('s', count($bindParams)), ...$bindParams);
}
$stmt->execute();

$games = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
echo json_encode($games);

/*

SELECT
	_g.id,
    _g.name,
    _gp.name AS provider,
    _g.href AS href,
    _gt.url AS imageURL,
    _gt.altName AS altName,
    _gt.accentColor1 AS accentColor1,
    _gt.accentColor2 AS accentColor2,
    _gt.accentColor3 AS accentColor3,
    _g.popular,
    _g.trending,
    _g.relevant
FROM
	games _g
    JOIN gameProviders _gp ON _gp.id = _g.provider
    JOIN gameThumbnails _gt ON _gt.id = _g.thumbnail
WHERE
	_g.name LIKE CONCAT(?, '%')
    AND _gp.name = ?
ORDER BY
    _g.popular
    DESC
;

*/
function buildQuery($provider, $gameName, $sortCriteria, $sortOrderName) {
    $query = '
SELECT
    _g.id,
    _g.name,
    _gp.name AS provider,
    _g.href AS href,
    _gt.url AS imageURL,
    _gt.altName AS altName,
    _gt.accentColor1 AS accentColor1,
    _gt.accentColor2 AS accentColor2,
    _gt.accentColor3 AS accentColor3,
    _g.popular,
    _g.trending,
    _g.relevant
FROM
	games _g
    JOIN gameProviders _gp ON _gp.id = _g.provider
    JOIN gameThumbnails _gt ON _gt.id = _g.thumbnail
';

    if ($provider || $gameName) {
        $query .= 'WHERE ';
    }
    if ($gameName) {
        $query .= "_g.name LIKE CONCAT(?, '%') ";
    }
    if ($provider && $gameName) {
        $query .= 'AND ';
    }
    if ($provider) {
        $query .= "_gp.name = ? ";
    }

    if (!in_array($sortCriteria, sortCriterias)) {
        $sortCriteria = 'popular';
    }
    
    $sortOrder = $sortOrderName == 'descending' ? 'DESC' : 'ASC';

    $query .= "
ORDER BY
    _g.$sortCriteria
    $sortOrder
;
";

    $bindParams = [];

    if ($provider) {
        $bindParams[] = $provider;
    }
    if ($gameName) {
        $bindParams[] = $gameName;
    }

    return [$query, $bindParams];
}
