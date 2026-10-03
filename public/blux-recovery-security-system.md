# Blux Recovery and Security System

**Project:** Blux  
**Status:** Implemented

## Database Recovery

Blux stores user and application data persistently in its production database.

The production database is backed up **daily**, providing a recent recovery point in case of database corruption, accidental deletion, failed migrations, infrastructure failure, or other issues affecting stored data.

If recovery is required, Blux can restore the database from the latest healthy backup, verify that user and application records are available, reconnect the backend, and resume normal operation.

Because backups are created daily, the exact recovery point depends on the most recent successful backup.

## Private Key Protection

For Blux-managed accounts, private keys are not stored as a single complete value in one location.

Instead, the private key is split into multiple parts and stored separately. This reduces the risk associated with a single storage location being compromised.

When a user requests an operation that requires signing, such as signing a Stellar transaction, the required key parts are retrieved and reconstructed inside a controlled signing environment.

The reconstructed private key is used only for the signing operation. The complete key is not intended to remain persistently stored as a single value after the operation is completed.

This process is used for operations that require access to the user's Blux-managed signing key.

## Recovery and Security Goals

The system is designed around two separate protections:

- **Data recovery:** Daily database backups allow Blux to restore user and application records after data loss or database failure.
- **Key protection:** Private keys are split across separate storage locations and reconstructed only when a signing operation requires them.

Together, these mechanisms reduce the risk of permanent data loss and reduce exposure of complete private keys during normal operation.

## Reviewer Verification

For tranche verification, Blux can provide evidence of:

- The daily production database backup schedule
- Existing backup recovery points
- A controlled database restore test
- The architecture used to split and separately store private-key components
- The signing flow showing that key reconstruction happens only when a signing operation is requested

Sensitive infrastructure details, private-key material, credentials, database contents, and storage secrets should not be included in public evidence.

## Completion

The recovery and security system is considered complete because:

- User and application data is stored persistently
- Production data is backed up daily
- The database can be restored from a previous backup
- Blux-managed private keys are split into multiple parts and stored separately
- Private-key reconstruction is performed only when required for signing
- Signing is performed in a controlled environment rather than by persistently storing the complete private key
