using Microsoft.AspNetCore.Mvc.Testing;

namespace backend.Tests;

public class PingTest
{
    private WebApplicationFactory<Program> _factory;
    private HttpClient _client;

    [SetUp]
    public void Setup()
    {
        _factory = new WebApplicationFactory<Program>();
        _client = _factory.CreateClient();
    }

    [TearDown]
    public void TearDown()
    {
        _client.Dispose();
        _factory.Dispose();
    }

    [Test]
    public async Task Ping_ReturnsPongiii()
    {
        // Act
        var response = await _client.GetAsync("/ping");

        // Assert
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();
        Assert.That(content, Is.EqualTo("pongiii"));
    }
}
