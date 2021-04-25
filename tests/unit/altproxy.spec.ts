import { ALTClassHasntMemberError } from '@/ALTError';
import { ALTClass, ALTInterface, ALTObject, ALTProxy, ALTRemoteLocator, CLASS, DECLARE_DYNAMIC, DECLARE_INTERFACE_FUNC, DYNAMIC_IMPLABLE_INTERFACE, gClassList, ITFC } from '@/ALTindex'

// 应用
@DYNAMIC_IMPLABLE_INTERFACE
abstract class ITest extends ALTInterface
{
	testfunc(): string { DECLARE_INTERFACE_FUNC(); return ""; };
}

@DYNAMIC_IMPLABLE_INTERFACE
abstract class ITest2 extends ALTInterface		// This will don't work. 不要这样写接口，请以上面的方式写。
{
	abstract testfunc(): string;
}

// 中端
class Test extends ALTObject implements ITest
{
	testfunc(): string{
		console.log("Hello!");
		return "Hello";
	}
};
DECLARE_DYNAMIC(Test)

class Test2 extends ALTObject implements ITest2
{
	testfunc(): string{
		console.log("Hello!");
		return "Hello";
	}
};
DECLARE_DYNAMIC(Test2)

test("Be able to call member of class in proxy object", () => {
    const proxy1: any = ALTProxy.makeProxy(ITFC(ITest), <ALTRemoteLocator>{});
	expect(() => { String(proxy1.testvar) }).toThrowError(ALTClassHasntMemberError);
	expect(proxy1.testfunc(123, true, "asdf")).toBe("test");

	const proxy2: any = ALTProxy.makeProxy(ITFC(ITest2), <ALTRemoteLocator>{});
	expect(() => { proxy2.testfunc() }).toThrowError(ALTClassHasntMemberError);
});