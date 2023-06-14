CREATE TRIGGER trigger_name
AFTER INSERT, UPDATE, DELETE ON Ques
FOR EACH ROW
BEGIN       
    IF (NEW.column_name IS NOT NULL) THEN        
    END IF;
    
    IF (NEW.column_name <> OLD.column_name) THEN      
    END IF;

    IF (OLD.column_name IS NOT NULL) THEN       
    END IF;
END;