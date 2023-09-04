-- AlterTable
ALTER TABLE `accounts` MODIFY `type` TEXT NOT NULL,
    MODIFY `refresh_token` TEXT NULL,
    MODIFY `access_token` TEXT NULL,
    MODIFY `token_type` TEXT NULL,
    MODIFY `scope` TEXT NULL,
    MODIFY `id_token` TEXT NULL,
    MODIFY `session_state` TEXT NULL,
    MODIFY `oauth_token_secret` TEXT NULL,
    MODIFY `oauth_token` TEXT NULL;
