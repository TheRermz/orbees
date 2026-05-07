namespace Api.Data.Seeds
{
    public static class DefaultSeeder
    {
        public static async Task SeedAsync(ApiDbContext context)
        {
            await RoleSeeder.SeedAsync(context);
            await AdminSeeder.SeedAsync(context);
            await CategorySeeder.SeedAsync(context);
            await BankSeeder.SeedAsync(context);
            await GroupRoleSeeder.SeedAsync(context);
            // --- DEBUG ---
            await DebugUserSeeder.SeedAsync(context);
        }
    }
}
