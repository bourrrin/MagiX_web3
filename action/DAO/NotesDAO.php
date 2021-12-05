<?php
    require_once("Connection.php");
    class NotesDAO {

        public static function getNotes() {
            $connection = Connection::getConnection();
            $result = null;

            $statement = $connection->prepare("SELECT * FROM note_magix");
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();

            $result = [];
            while ($row = $statement->fetch()) {
                $result[] = $row;
            }

            return $result;
        }

        public static function addNotes($note){
            $connection = Connection::getConnection();
            $statement = $connection->prepare("INSERT INTO note_magix (note)
            VALUES (?)");
            $statement->bindParam(1, $note);
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();
        }

        public static function deleteNotes($id){
            $connection = Connection::getConnection();
            $statement = $connection->prepare("DELETE FROM note_magix WHERE id=?");
            $statement->bindParam(1, $id);
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();
        }

        public static function modifyNotes($note,$id){
            $connection = Connection::getConnection();
            $statement = $connection->prepare("UPDATE note_magix SET note=? WHERE id=?");
            $statement->bindParam(1, $note);
            $statement->bindParam(2, $id);
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();
        }
    }
