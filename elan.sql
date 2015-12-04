-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le: Ven 04 Décembre 2015 à 01:12
-- Version du serveur: 5.6.12-log
-- Version de PHP: 5.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `elan`
--
CREATE DATABASE IF NOT EXISTS `elan` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `elan`;

-- --------------------------------------------------------

--
-- Structure de la table `assoeventhashtag`
--

CREATE TABLE IF NOT EXISTS `assoeventhashtag` (
  `Ev_id` int(9) NOT NULL,
  `H_id` int(9) NOT NULL,
  PRIMARY KEY (`Ev_id`,`H_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `event`
--

CREATE TABLE IF NOT EXISTS `event` (
  `Ev_id` int(9) NOT NULL AUTO_INCREMENT,
  `Ev_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Ev_lg` double(10,6) NOT NULL,
  `Ev_lat` double(7,6) NOT NULL,
  `Ev_descr` varchar(200) NOT NULL,
  `Ev_traite` tinyint(1) NOT NULL,
  `Ev_nb_tweet` int(2) NOT NULL,
  PRIMARY KEY (`Ev_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Contenu de la table `event`
--

INSERT INTO `event` (`Ev_id`, `Ev_date`, `Ev_lg`, `Ev_lat`, `Ev_descr`, `Ev_traite`, `Ev_nb_tweet`) VALUES
(1, '2015-12-04 00:46:35', 48.714407, 2.426664, '#feu', 0, 1);

-- --------------------------------------------------------

--
-- Structure de la table `hashtag`
--

CREATE TABLE IF NOT EXISTS `hashtag` (
  `H_id` int(9) NOT NULL AUTO_INCREMENT,
  `H_nom` varchar(100) NOT NULL,
  `H_safe_zone` double NOT NULL,
  PRIMARY KEY (`H_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=18 ;

--
-- Contenu de la table `hashtag`
--

INSERT INTO `hashtag` (`H_id`, `H_nom`, `H_safe_zone`) VALUES
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
