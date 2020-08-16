<h1>Nastavení</h1>

<script src='/SRedakt/js/settings.js'></script>

<div class="row">
    <div class="col">
        <div class="card-deck">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Databáze</h4>
                    <div id="dbAlert" class="alert"></div>
                    <script>set.dbControl();</script>
                    <?php
                        $database = json_decode(file('DBinfo/dbinfo.json')[0]);
                    ?>
                    <table class="table">
                        <tr>
                            <th>Server:</th>
                            <th>
                                <span id="serverNameSpan"><?php echo ($database->serverName); ?></span>
                                <input id="serverNameInput" class="d-none" value="<?php echo ($database->serverName); ?>">
                            </th>
                            <th><button id="serverNameBtn" class="btn btn-success" onclick="set.edit('serverName')">Upravit</button></th>
                        </tr>
                        <tr>
                            <th>Uživatel:</th>
                            <th>
                                <span id="userNameDbSpan"><?php echo ($database->userNameDb); ?></span>
                                <input id="userNameDbInput" class="d-none" value="<?php echo ($database->userNameDb); ?>">
                            </th>
                            <th><button id="userNameDbBtn"  class="btn btn-success" onclick="set.edit('userNameDb')">Upravit</button></th>
                        </tr>
                        <tr>
                            <th>Databáze:</th>
                            <th>
                                <span id="dbNameSpan"><?php echo ($database->dbName); ?></span>
                                <input id="dbNameInput" class="d-none" value="<?php echo ($database->dbName); ?>">
                            </th>
                            <th><button id="dbNameBtn" class="btn btn-success" onclick="set.edit('dbName')">Upravit</button></th>
                        </tr>
                        <tr>
                            <th>Heslo:</th>
                            <th>
                                <div>
                                    <div id="passwordAlert" class="alert alert-danger d-none">Hesla nejsou stejná!</div>
                                    <span id="passwordSpan">******</span>
                                    <div id="passwordDiv" class="form-group d-none">
                                        <label>Nové heslo</label>
                                        <input type="password" id="passwordInput1">
                                        <label>Nové heslo znovu</label>
                                        <input type="password" id="passwordInput2">
                                    </div>
                                </div>
                            </th>
                            <th><button id="passwordBtn" class="btn btn-info" onclick="set.passEdit('password')">Změnit</button></th>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Obecné</h4>
                    <table class="table">
                        <tr>
                            <th>Název webu:</th>
                            <th>
                                <span id="webNameSpan"><?php echo ($database->webName); ?></span>
                                <input id="webNameInput" class="d-none" value="<?php echo ($database->webName); ?>">
                            </th>
                            <th><button id="webNameBtn" class="btn btn-success" onclick="set.edit('webName')">Upravit</button></th>
                        </tr>
                        <tr>
                            <th>Přihlašovací jméno:</th>
                            <th>
                                <span id="userNameSpan"><?php echo ($database->userName); ?></span>
                                <input id="userNameInput" class="d-none" value="<?php echo ($database->userName); ?>">
                            </th>
                            <th><button id="userNameBtn" class="btn btn-success" onclick="set.edit('userName')">Upravit</button></th>
                        </tr>
                        <tr>
                            <th>Přihlašvací heslo:</th>
                            <th>
                                <div>
                                    <div id="userPassAlert" class="d-none">Hesla nejsou stejná!</div>
                                    <div id="userPassOldAlert" class="d-none">Špatné heslo!</div>
                                    <span id="userPassSpan">******</span>
                                    <div id="userPassDiv" class="form-group d-none">
                                        <label>Staré heslo</label>
                                        <input type="password" id="userPassOldPass">
                                        <label>Nové heslo</label>
                                        <input type="password" id="userPassInput1">
                                        <label>Nové heslo znovu</label>
                                        <input type="password" id="userPassInput2">
                                    </div>
                                </div>
                            </th>
                            <th><button id="userPassBtn" class="btn btn-info" onclick="set.passEdit('userPass')">Změnit</button></th>
                        </tr>
                    </table>
                    <?php
                    ?>

                </div>
            </div>
        </div>
    </div>
</div>
