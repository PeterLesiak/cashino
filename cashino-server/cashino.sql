-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 02, 2025 at 11:32 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cashino`
--

-- --------------------------------------------------------

--
-- Table structure for table `gameProviders`
--

CREATE TABLE `gameProviders` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `gameProviders`
--

INSERT INTO `gameProviders` (`id`, `name`) VALUES
(1, 'bgaming'),
(2, 'cloudfront'),
(3, 'spribegaming'),
(4, 'freeslots'),
(5, 'turbogames');

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `provider` int(11) NOT NULL,
  `href` varchar(1000) DEFAULT NULL,
  `thumbnail` int(11) NOT NULL,
  `popular` decimal(5,2) NOT NULL,
  `trending` decimal(5,2) NOT NULL,
  `relevant` decimal(5,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`id`, `name`, `provider`, `href`, `thumbnail`, `popular`, `trending`, `relevant`) VALUES
(1, 'roulette', 2, 'https://d1k6j4zyghhevb.cloudfront.net/casino/launcher.html?gameid=roulettenouveau&amp=&lang=en&partner=ubg&partnerid=4&jurisdiction=MT&login=demo&moneymode=fun&channel=web&homeurlFEATUREHIDDEN=https%3A%2F%2Fwww.unibet.eu%2Fcasino%2F&callback=cms.widget.Game.externalEventHandler&apex=1&fullscreen=false', 1, 96.45, 22.21, 60.22),
(2, 'dice', 1, 'https://bgaming-network.com/games/DiceClash/FUN?play_token=9f7e840d-b7d5-48cd-a8e8-32cfc5ae2601', 2, 60.81, 40.48, 40.13),
(3, 'plinko', 1, 'https://bgaming-network.com/games/Plinko/FUN?play_token=8ca584a7-ef76-46f9-9cc8-0ea4fde76138', 3, 97.98, 85.21, 12.56),
(4, 'mines', 3, 'https://turbo.spribegaming.com/mines?currency=USD&operator=demo&jurisdiction=CW&lang=EN&return_url=https:%2F%2Fspribe.co%2Fgames&user=21449&token=8Dr6z9TCpS7nHUVq3GIstHl3NMJPel4O', 4, 78.30, 50.67, 79.65),
(5, 'slots', 4, 'https://www.freeslots.com/Slot11.htm', 5, 94.22, 60.08, 94.39),
(6, 'towers', 5, 'https://towers.turbogames.io/', 6, 20.87, 63.84, 29.83),
(7, 'crash', 5, 'https://aero.turbogames.io/?token=&locale=en&demo=true&sub_partner_id=sportsbet&lobby_url=https%3A%2F%2Fsportsbet.io%2Fcasino&cid=hub88tgc', 7, 58.45, 92.82, 34.73);

-- --------------------------------------------------------

--
-- Table structure for table `gameThumbnails`
--

CREATE TABLE `gameThumbnails` (
  `id` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `altName` varchar(255) NOT NULL,
  `accentColor1` char(6) NOT NULL,
  `accentColor2` char(6) NOT NULL,
  `accentColor3` char(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `gameThumbnails`
--

INSERT INTO `gameThumbnails` (`id`, `url`, `altName`, `accentColor1`, `accentColor2`, `accentColor3`) VALUES
(1, '/roulette-thumbnail.png', 'roulette game', '735BFF', '37CEFF', '70DBFF'),
(2, '/dice-thumbnail.png', 'dice game', '7B21BD', 'FFA564', 'FFAC70'),
(3, '/plinko-thumbnail.png', 'plinko game', 'A20BE9', 'B95AFF', 'C470FF'),
(4, '/mines-thumbnail.png', 'mines game', '2456CF', '1ABEA8', '81EEDF'),
(5, '/slots-thumbnail.png', 'slots game', '8826C7', 'FFCB70', 'FFA70F'),
(6, '/towers-thumbnail.png', 'towers game', 'FF7633', '4EBBEC', '7ECDF1'),
(7, '/crash-thumbnail.png', 'crash game', '114194', 'AD46FF', 'BF70FF');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `expiresAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `money` decimal(12,2) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `phoneNumber` char(9) DEFAULT NULL,
  `PESEL` char(11) NOT NULL,
  `bankAccountNumber` char(26) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `phoneNumber`, `PESEL`, `bankAccountNumber`, `email`, `password`, `admin`) VALUES
(6, 'Piotr', 'Lesiak', '798432897', '99890832490', '87463298436287438746387368', 'piotr.lesiak@gmail.com', '$2y$10$Ywz6IT88b.fVv2ujKec7hOWgu.fEK.vKUHh0h9Ub9VFJ1nq9OoAgK', 1),
(7, 'Simon', 'Limon', NULL, '21372137213', '43874765385687687687687687', 'simon@limon.pl', '$2y$10$Po.OVFlrwmdhGF/8wn3gV.0HdZfIiQRI2hAdBu9J4UP/FTkC7jRkW', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `gameProviders`
--
ALTER TABLE `gameProviders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_games_providers` (`provider`),
  ADD KEY `fk_games_thumbnails` (`thumbnail`);

--
-- Indexes for table `gameThumbnails`
--
ALTER TABLE `gameThumbnails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `gameProviders`
--
ALTER TABLE `gameProviders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `games`
--
ALTER TABLE `games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `gameThumbnails`
--
ALTER TABLE `gameThumbnails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `games`
--
ALTER TABLE `games`
  ADD CONSTRAINT `fk_games_providers` FOREIGN KEY (`provider`) REFERENCES `gameProviders` (`id`),
  ADD CONSTRAINT `fk_games_thumbnails` FOREIGN KEY (`thumbnail`) REFERENCES `gameThumbnails` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
