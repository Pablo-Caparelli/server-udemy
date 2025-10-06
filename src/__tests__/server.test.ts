import server, { connectDB } from "../server";
//import request from "supertest";
import db from "../config/db";

// describe("GET /api", () => {
//   it("should send back a json response", async () => {
//     const res = await request(server).get("/api");

//     expect(res.status).toBe(200);
//     expect(res.headers["content-type"]).toMatch(/json/);
//     expect(res.body.msg).toBe("Desde API");

//     expect(res.status).not.toBe(404);
//     expect(res.body.msg).not.toBe("desde api");
//   });
// });

jest.mock("../config/db");

describe("connectDB", () => {
  it("should handle database connection error", async () => {
    jest
      .spyOn(db, "authenticate")
      .mockRejectedValueOnce(new Error("Hubo un error al conectar a la BD"));
    const consoleSpy = jest.spyOn(console, "log");

    await connectDB();

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Hubo un error al conectar a la BD")
    );
  });

  it("should connect successfully", async () => {
    const authMock = jest
      .spyOn(db, "authenticate")
      .mockResolvedValueOnce(undefined);
    const syncMock = jest.spyOn(db, "sync").mockResolvedValueOnce(undefined);

    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    await connectDB();

    expect(authMock).toHaveBeenCalled(); // ✅ cubre línea 10
    expect(syncMock).toHaveBeenCalled(); // ✅ cubre línea 11
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Conexión exitosa a la BD")
    );

    consoleSpy.mockRestore();
  });
});

/*
//se puede usar test o it
describe('Nuestro primer test', () => {
    it('Debe revisar que 1 + 1 sean 2', () => {
        expect(1 + 1).toBe(2)
    })

    it('Debe revisar que 1 + 1 sean 2', () => {
        expect(1 + 1).not.toBe(3)
    })
})
*/
