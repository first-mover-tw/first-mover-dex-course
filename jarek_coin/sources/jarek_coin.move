module jarek_coin::jarek {
    use sui::coin_registry;

    const TOTAL_SUPPLY: u64 = 1000000_000000; // 1M

    public struct JAREK has drop {}

    fun init(otw: JAREK, ctx: &mut TxContext) {
        let (mut currency, mut treasury_cap) = coin_registry::new_currency_with_otw<JAREK>(
            otw,
            6,
            b"JAREK".to_string(),
            b"Jarek Coin for fun".to_string(),
            b"jarek coin on Sui testnet network. for education usage, don't be too serious".to_string(),
            b"https://i.pinimg.com/1200x/e9/7f/6c/e97f6c5736288494b0bf142225a319f1.jpg".to_string(),
            ctx,
        );
        // Use the `TreasuryCap` to mint the total supply of the coin.
        let total_supply = treasury_cap.mint(TOTAL_SUPPLY, ctx);
        // Make the supply fixed by giving up TreasuryCap.
        currency.make_supply_fixed(treasury_cap);

        // Finalize the building process and claim the metadata cap.
        let metadata_cap = currency.finalize(ctx);

        // Transfer the minted supply and metadata cap to the publisher.
        transfer::public_transfer(metadata_cap, ctx.sender());
        transfer::public_transfer(total_supply, ctx.sender());
    }

    // example: https://suiscan.xyz/mainnet/coin/0x68282d3a3ceb1a9072ab85b9ce6a8f9b25bc989da9f972a70bbf898068098de8::jarek::JAREK/traders
}
