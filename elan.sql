-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le: Jeu 03 Décembre 2015 à 21:19
-- Version du serveur: 5.5.46-0ubuntu0.14.04.2
-- Version de PHP: 5.5.9-1ubuntu4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `elan`
--

-- --------------------------------------------------------

--
-- Structure de la table `AssoEventHashtag`
--

CREATE TABLE IF NOT EXISTS `AssoEventHashtag` (
  `Ev_id` int(9) NOT NULL,
  `H_id` int(9) NOT NULL,
  PRIMARY KEY (`Ev_id`,`H_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Event`
--

CREATE TABLE IF NOT EXISTS `Event` (
  `Ev_id` int(9) NOT NULL AUTO_INCREMENT,
  `Ev_date` date NOT NULL,
  `Ev_lg` double NOT NULL,
  `Ev_lat` double NOT NULL,
  `Ev_descr` varchar(200) NOT NULL,
  `Ev_traite` tinyint(1) NOT NULL,
  `Ev_prio` int(2) NOT NULL,
  PRIMARY KEY (`Ev_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `Hashtag`
--

CREATE TABLE IF NOT EXISTS `Hashtag` (
  `H_id` int(9) NOT NULL AUTO_INCREMENT,
  `H_nom` varchar(100) NOT NULL,
  `H_safe_zone` double NOT NULL,
  PRIMARY KEY (`H_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=18 ;

--
-- Contenu de la table `Hashtag`
--

INSERT INTO `Hashtag` (`H_id`, `H_nom`, `H_safe_zone`) VALUES
(1, 'Feu', 1000),
(2, 'Incendie', 1000),
(3, 'Seisme', 10000),
(4, 'TremblementDeTerre', 10000),
(5, 'Tsunami', 5000),
(6, 'Explosion', 1000),
(7, 'Radiations', 25000),
(8, 'Nucléaire', 25000),
(9, 'Bombardement', 10000),
(10, 'Maladie', 10000),
(11, 'Braquage', 5000),
(12, 'Chimique', 10000),
(13, 'Zombie', 10000),
(14, 'Inondation', 10000),
(15, 'Tempête', 50000),
(16, 'Tornade', 10000),
(17, 'Ouragan', 100000);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
