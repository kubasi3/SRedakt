<?php
function loginForm($database) {
    if(isset($_POST['name'])) {
        if($database->userName == $_POST['name']) {
            if(password_verify($_POST['pass'], $database->userPass)) {
                $log['login'] = 'd-none';
                $log['loged'] = '';
                $log['alert'] = 'd-none';
                $_SESSION['login'] = true;
            } else {
                $log['login'] = '';
                $log['loged'] = 'd-none';
                $log['alert'] = '';
            }
        } else {
            $log['login'] = '';
            $log['loged'] = 'd-none';
            $log['alert'] = '';
        }
    } else {
        $log['login'] = '';
        $log['loged'] = 'd-none';
        $log['alert'] = 'd-none';
    }
    return $log;
}
if (isset($_SESSION['login'])) {
    if ($_SESSION['login']) { 
        $log['login'] = 'd-none';
        $log['loged'] = '';
        $log['alert'] = 'd-none';
        if(isset($logText)) {
            $logText = '<script>document.getElementById("logout").className = "btn btn-outline-danger";</script>';
        }
    } else {
        $log=loginForm($database);
    }
} else {
    $log=loginForm($database);
}

?>

<div class="card <?php echo($log['loged']); ?>">
    <div class="card-body d-flex justify-content-center">
        <h1 class="card-title">Jsi přihlášen!</h1>
    </div>
</div>

<div class="card <?php echo($log['login']); ?>" style="width:500px">
    <div class="card-body d-flex justify-content-center">
        <div>
            <h1 class="card-title" >Přihlášení</h1>
            <div class="alert alert-danger <?php echo($log['alert']); ?>">Špatné jméno nebo heslo!</div>
            <form action="/SRedakt/index.php" method="post">
                <div class="form-group">
                    <label for="name">Přihlašovací jméno</label>
                    <br>
                    <input id="name" placeholder="Jméno" name="name">
                </div>
                <div class="form-group">
                    <label>Heslo</label>
                    <br>
                    <input type="password" name="pass">
                </div>
                <button type="submit" class="btn btn-success">Přihlásit se</button>
            <div>
        </form>
    </div>
</div>